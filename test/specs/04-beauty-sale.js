const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', function () {
    this.retries(2);

    it('should find bargains in Beauty category', () => {
        const womenPage = 'c/offers/sale-beauty',
            category = 'beauty';
        discount = process.env.DISCOUNT || 60;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(womenPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.findBargains(category);
    });
});