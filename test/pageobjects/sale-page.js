const { assert } = require('chai');
const Page = require('./page');
const fs = require('fs');
const path = require('path');
let items = 0, screenshotSubFolder, today, existingItems, lastPageNumber;

class onSalePage extends Page {

    get products() { return $$('div[data-automation=product]') };
    get nextBtn() { return $('a=Next') };
    get pageHeader() { return $('h1.css-1sfahi1') };
    get totalItemsElement() { return $('span[data-automation=product-total]') };
    get paginateContainer() { return $('ol[data-automation=paginateContainer]') };
    get paginateContainerList() { return this.paginateContainer.$$('li') };


    open(extension) {
        return super.open(extension);
    }

    confirmScreenshotFolderIsExisting(category) {
        let screenshotMainFolder = 'screenshots/';
        if (!fs.existsSync(screenshotMainFolder)) {
            fs.mkdirSync(screenshotMainFolder);
            // return screenshotFolder;
        }
        screenshotSubFolder = 'screenshots/' + category + '/';
        if (!fs.existsSync(screenshotSubFolder)) {
            fs.mkdirSync(screenshotSubFolder);
            return screenshotSubFolder;
        }
    }

    findBargains(category) {
        this.getTodayDate();
        if (this.paginateContainer.isExisting()) {
            lastPageNumber = Number(this.paginateContainerList[this.paginateContainerList.length - 2].getText());
        } else {
            lastPageNumber = 1;
        }
        const totalItems = this.getNumber(this.totalItemsElement.getText());
        let count = 1;
        for (let i = 0; i < lastPageNumber; i++) {
            console.log(category + ' --->> page ' + count + ' of ' + lastPageNumber);
            this.discountCalculator(category);
            try {
                if (this.nextBtn.waitForDisplayed({ timeout: 3000 })) {
                    let oldUrl = browser.getUrl();
                    this.nextBtn.click();
                    this.pageHeader.waitForDisplayed({ timeout: 60000 });
                    browser.waitUntil(() => oldUrl != browser.getUrl(), { timeout: 60000 });
                    let newUrl = browser.getUrl();
                    oldUrl = newUrl;
                    count += 1;
                    expect(newUrl).toContain('=' + count);
                }
                else {
                    break;
                }
            } catch (error) {
                break;
            }
        }
        assert.equal(totalItems, items, '=====>>> Some products are missing <<<=====');
        console.log('=====>>> ' + category + ' bargains search is finished after scanning ' + totalItems + ' items <<<=====\n')
    }

    discountCalculator(category) {
        let productBrand, productName, nowPrice, wasPrice, percent, filepath, name, extraDiscount, discountRate, priceBlockHTML;

        this.products.forEach(product => {
            try {
                items += 1;
                product.waitForDisplayed();
                // product.scrollIntoView();
                priceBlockHTML = product.$('div[data-automation=product-price]').getHTML();

                if (priceBlockHTML.includes('product-price-was') && priceBlockHTML.includes('product-price-now')) {
                    wasPrice = this.getWasPrice(product);
                    nowPrice = this.getNowPrice(product);

                    if (product.$('div[data-automation=product-label]').isExisting()) {
                        const productText = product.getText();
                        if (productText.includes('further') && productText.includes('%')) {
                            if (product.$('a*=Take a further').isExisting()) {
                                extraDiscount = product.$('a*=Take a further').getText().split(' ');
                            } else {
                                extraDiscount = product.$('span*=Take a further').getText().split(' ');
                            }
                            discountRate = extraDiscount[3].slice(0, 2);
                            nowPrice = nowPrice - (nowPrice * discountRate / 100);
                        }
                    }

                    percent = ((1 - (nowPrice / wasPrice)) * 100).toFixed(0);
                    if (percent >= Number(discount)) {
                        if (!product.$('div.small-text').isExisting() || !product.$('div.small-text').getText().includes('Out of stock')) {
                            if (product.$('span[data-automation=product-brand').isExisting()) {
                                productBrand = product.$('span[data-automation=product-brand]').getText();
                            } else {
                                productBrand = '';
                            }
                            productName = product.$('span[data-automation=product-name]').getText();
                            name = productBrand + ' ' + productName;
                            name = name.split('.').join('').split('/').join('');
                            nowPrice = Number(nowPrice).toFixed(0);
                            let itemName = percent + '% Off (Now $' + nowPrice + ') ' + name + '.png';
                            filepath = screenshotSubFolder + today + '--> ' + percent + '% Off (Now $' + nowPrice + ') ' + name + '.png';
                            if (!existingItems.includes(itemName)) {
                                product.scrollIntoView();
                                browser.waitUntil(() => product.$('img').isDisplayed());
                                this.drawHighlight(product);
                                browser.saveScreenshot(filepath);
                                this.removeHighlight(product);
                            }
                        }
                    }
                }
            } catch (error) {
                console.log('An error happened while scanning --->> ' + name);
                product.scrollIntoView();
                this.drawHighlight(product);
                filepath = 'errorScreenshot/' + category + ' error.png';
                browser.saveScreenshot(filepath);
                this.removeHighlight(product);
                throw error;
            }
        })
    }

    getPrice(text) {
        let price;
        price = text.slice(1);
        return price;
    }

    getWasPrice(product) {
        let wasPriceTxt = product.$('span[data-automation=product-price-was]').getText();
        // let wasPriceTxt = product.$('p[data-automation=product-price-was] span:nth-child(2)').getText();
        let wasPrice = this.getPrice(wasPriceTxt);
        return wasPrice;
    }

    getNowPrice(product) {
        let nowPriceTxt = product.$('span[data-automation=product-price-now]').getText();
        let nowPrice = this.getPrice(nowPriceTxt);
        return nowPrice;
    }

    getNumber(text) {
        let numberText = text.split(' ');
        let textNumber = numberText[0].split(',').join('');
        return Number(textNumber);
    }

    getTodayDate() {
        let date = new Date();
        today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    }

    getExistingItems() {
        existingItems = [];
        const directoryPath = path.join(screenshotSubFolder);
        fs.readdir(directoryPath, function (err, files) {
            files.forEach(function (file) {
                let fileName = file.toString().split(' ').slice(1).join(' ');
                existingItems.push(fileName);
            });
            // console.log('********: ' +existingItems.length);
        });

        return existingItems;
    }
}

module.exports = new onSalePage();
