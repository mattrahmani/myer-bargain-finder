const { assert } = require('chai');
const Page = require('./page');
const fs = require('fs');

let items = 0;
class SalePage extends Page {

    get products() {return $$('div[data-automation=product]')};
    get nextBtn() {return $('a=Next') };
    get pageHeader() {return $('h1.css-1sfahi1')};
    get totalProductsElement() {return $('span[data-automation=product-total]')};

    open (extension) {
        return super.open(extension);
    }

    bargainFinder(category) {
        let totalProducts =this.getNumber(this.totalProductsElement.getText());
        let count = 1;
        for (let i=0; i<300; i++) {
            this.discountCalculator(category);
            try {
                if (this.nextBtn.isDisplayed()) {
                    console.log(category+count);
                    this.nextBtn.click();
                    this.pageHeader.waitForDisplayed();
                    count+=1;
                    expect(browser).toHaveUrlContaining('='+count);
                }
                else{
                    break;
                }
            } catch (error) {
                break;
            }
        }
        assert.equal(totalProducts, items, '=====>>> Some products are missing <<<=====');
    }

    discountCalculator(category) {
        let productBrand, productName, nowPrice, wasPrice, percent, filepath, name, discount, discountRate;
        
        this.products.forEach(product => {
            try {
                items+=1;
                product.waitForDisplayed();
                let productText = product.getText();
                let productHtml = product.getHTML();
                if (productText.includes('Was') && productText.includes('Now')) {
                    if (productHtml.includes('brand')) {
                        productBrand = product.$('span[data-automation=product-brand]').getText();
                    } else {
                        productBrand = '';
                    }
                    productName = product.$('span[data-automation=product-name]').getText();
                    wasPrice = this.getWasPrice(product);
                    nowPrice = this.getNowPrice(product);
                    if (productText.includes('further') && productText.includes('%')) {
                        discount = product.$('span*=Take a further').getText().split(' ');
                        discountRate = discount[3].slice(0,2);
                        nowPrice = nowPrice - (nowPrice * discountRate/100);
                    }
                    percent = ((1-(nowPrice/wasPrice))*100).toFixed(0);
                    if (70<=percent) {
                        name = productBrand + ' ' + productName;
                        name = name.split('.').join('').split('/').join('');
                        filepath = 'screenshots/' + category + '/' + percent + ' ' + name + '.png';
                        if (!fs.existsSync(filepath)) {
                            product.scrollIntoView();
                            browser.waitUntil(() => product.$('img').isDisplayed());
                            this.drawHighlight(product);
                            browser.saveScreenshot(filepath);
                            this.removeHighlight(product);
                        }
                    }
                }
            } catch (error) {
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
        let wasPriceTxt = product.$('p[data-automation=product-price-was] span:nth-child(2)').getText();
        let wasPrice = this.getPrice(wasPriceTxt);
        return wasPrice;
    }

    getNowPrice(product) {
        let nowPriceTxt = product.$('p[data-automation=product-price-now] span:nth-child(2)').getText();
        let nowPrice = this.getPrice(nowPriceTxt);
        return nowPrice;
    }

    getNumber(text) {
        let numberText = text.split(' ');
        let textNumber = numberText[0].split(',').join('');
        return Number(textNumber);
    }
}

module.exports = new SalePage();
