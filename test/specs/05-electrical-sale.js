const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', function () {
    this.retries(2);

    it('should find bargains in Electrical category', () => {
        const entertainmentPage = 'c/offers/electrical-sale',
            category = 'electrical';
        discount = process.env.DISCOUNT || 50;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(entertainmentPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});