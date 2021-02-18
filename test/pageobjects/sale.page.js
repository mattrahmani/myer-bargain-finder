const { assert } = require('chai');
const Page = require('./page');
const fs = require('fs');

let items = 0;
class SalePage extends Page {

    get products() {return $$('li[data-automation=product-grid-item]')};
    get nextBtn() {return $('a=Next') };
    get pageHeader() {return $('h1.css-1sfahi1')};
    get totalProductsElement() {return $('span[data-automation=product-total]')};
    get furtherDiscountWrapper() {return $('span*=Take a further')};

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
            items+=1;
            product.waitForDisplayed();
            let productText = product.getText();
            let productHtml = product.getHTML();
            if (productText.includes('Was') && productText.includes('Now')) {
                if (productHtml.includes('brand')) {
                    productBrand = product.$('span[data-automation=product-brand]').getText();
                }
                productName = product.$('span[data-automation=product-name]').getText();
                wasPrice = this.getWasPrice(product);
                nowPrice = this.getNowPrice(product);
                if (productText.includes('further')) {
                    discount = (this.furtherDiscountWrapper.getText().split(' '))[3];
                    discountRate = discount.slice(0,2);
                    nowPrice = nowPrice - (nowPrice * discountRate/100);
                }
                percent = ((1-(nowPrice/wasPrice))*100).toFixed(0);
                if (65<=percent && percent<70) {
                    name = productBrand + ' ' + productName;
                        name = name.split('.').join('').split('/').join('');
                        filepath = 'screenshots/60to70/' + percent + ' ' + name + '.png';
                        if (!fs.existsSync(filepath)) {
                            product.scrollIntoView();
                            this.drawHighlight(product);
                            browser.saveScreenshot(filepath);
                            this.removeHighlight(product);
                        }
                };
                if (70<=percent && percent<80) {
                    name = productBrand + ' ' + productName;
                    name = name.split('.').join('').split('/').join('');
                    filepath = 'screenshots/70to80/' + percent + ' ' + name + '.png';
                    if (!fs.existsSync(filepath)) {
                        product.scrollIntoView();
                        this.drawHighlight(product);
                        browser.saveScreenshot(filepath);
                        this.removeHighlight(product);
                    }
                };
                if (percent>=80) {
                    name = productBrand + ' ' + productName;
                    name = name.split('.').join('').split('/').join('');
                    filepath = 'screenshots/over80/' + percent + ' ' + name + '.png';
                    if (!fs.existsSync(filepath)) {
                        product.scrollIntoView();
                        this.drawHighlight(product);
                        browser.saveScreenshot(filepath);
                        this.removeHighlight(product);
                        }
                };
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
