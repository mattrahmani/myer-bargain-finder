const { assert } = require('chai');
const Page = require('./page');

let discountRangeOne = [];
let discountRangeTwo = [];
let discountRangeThree = [];
let items = 0;
/**
 * sub page containing specific selectors and methods for a specific page
 */
class SalePage extends Page {

    get products() {return $$('li[data-automation=product-grid-item]')}
    get nextBtn() {return $('a=Next') };
    get pageHeader() {return $('h1.css-1sfahi1')}
    get pageNumberElement() {return $('ol[data-automation="paginateContainer"] li:nth-child(9)')}
    get totalProductsElement() {return $('span[data-automation=product-total]')}
    /**
     * overwrite specifc options to adapt it to page object
     */
    open (extension) {
        return super.open(extension);
    }

    bargainFinder(category) {
        let totalProducts =this.getNumber(this.totalProductsElement.getText());
        let count = 1;
        for (let i=0; i<200; i++) {
            this.discountCalculator(category);
            try {
                if (this.nextBtn.isDisplayed()) {
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
        console.log(category + ' Page ' + count);
        this.printSaleItems(category);
        assert.equal(totalProducts, items, '=====>>> Some products are missing <<<=====');
    }

    printSaleItems(category) {
        console.log('\n=====>>>' + category + ' sale list between 60%-70%:');
        for (let i=0; i<discountRangeOne.length; i++) {
            console.log('=====>>> ' + i + ' - ' + discountRangeOne[i]);
        }
        // console.log('\n=====>>> ' + category + ' sale list between 70%-80%:');
        // for (let i=0; i<discountRangeTwo.length; i++) {
        //     console.log('=====>>> ' + i + ' - ' + discountRangeTwo[i]);
        // }
        // console.log('\n=====>>> ' + category + ' sale list over 80%:');
        // for (let i=0; i<discountRangeThree.length; i++) {
        //     console.log('=====>>> ' + i + ' - ' + discountRangeThree[i]);
        // }
        console.log('Number of Items in ' + category + ' =====>>> ' + items) + '\n';
    }

    discountCalculator(category) {
        let productBrand;
        let productName;
        let nowPrice;
        let wasPrice;
        let percent;
        let filepath;
        // this.pageHeader.waitForDisplayed();
        this.products.forEach(product => {
            items+=1;
            product.waitForDisplayed();
            product.scrollIntoView();
            let productText = product.getText();
            let productHtml = product.getHTML();
            // console.log(productHtml)
            if (productText.includes('Was') && productText.includes('Now')) {
                // if (productText.includes('Now')) {
                    if (productHtml.includes('brand')) {
                        productBrand = product.$('span[data-automation=product-brand]').getText();
                    }
                    productName = product.$('span[data-automation=product-name]').getText();
                    wasPrice = this.getWasPrice(product);
                    nowPrice = this.getNowPrice(product);
                    percent = (1-(nowPrice/wasPrice))*100;
                    if (60<=percent && percent<70) {
                        let name = productBrand + ' ' + productName;
                        discountRangeOne.push(name);
                        if (productText.includes('further')) {
                            product.$('div[data-automation=product-price]').click();
                            name = name.split('.').join('').split('/').join('');
                            filepath = 'screenshots/60to70/' + name + '.png';
                            browser.saveScreenshot(filepath);
                        }
                    };
                    if (70<=percent && percent<80) {
                        let name = productBrand + ' ' + productName;
                        discountRangeTwo.push(name);
                        product.$('div[data-automation=product-price]').click();
                        name = name.split('.').join('').split('/').join('');
                        filepath = 'screenshots/70to80/' + name + '.png';
                        browser.saveScreenshot(filepath);
                    };
                    if (percent>=80) {
                        let name = productBrand + ' ' + productName;
                        discountRangeThree.push(name);
                        product.$('div[data-automation=product-price]').click();
                        name = name.split('.').join('').split('/').join('');
                        filepath = 'screenshots/over80/' + name + '.png';
                        browser.saveScreenshot(filepath);
                    };
                // }
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
