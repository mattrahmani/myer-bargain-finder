const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', function () {
    this.retries(2);

    it('should find bargains in Women category', () => {
        const womenPage = 'c/offers/women--sale',
            category = 'women';
        discount = process.env.DISCOUNT || 70;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(womenPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});