const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', () => {

    it('should find bargains in Electrical category', () => {
        const entertainmentPage = 'c/offers/sale-electrical',
            category = 'electrical';
        discount = process.env.DISCOUNT || 50;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(entertainmentPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});