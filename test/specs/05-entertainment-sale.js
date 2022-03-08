const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', () => {

    it('should find bargains in Entertainment category', () => {
        const entertainmentPage = 'c/offers/sale-electrical',
            category = 'entertainment';
        discount = process.env.DISCOUNT || 50;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(entertainmentPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});