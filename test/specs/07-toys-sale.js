const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', function () {
    this.retries(2);

    it('should find bargains in Toys category', () => {
        const toysPage = 'c/offers/toys--sale',
            category = 'toys';
        discount = process.env.DISCOUNT || 50;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(toysPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.findBargains(category);
    });
});