const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', function () {
    this.retries(2);

    it('should find bargains in Beauty category', () => {
        const womenPage = 'c/offers/beauty-737623-1',
            category = 'beauty';
        discount = process.env.DISCOUNT || 60;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(womenPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});