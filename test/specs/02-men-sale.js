const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', function () {
    this.retries(2);

    it('should find bargains in Men category', () => {
        const menPage = 'c/offers/men-sales',
            category = 'men';
        discount = process.env.DISCOUNT || 70;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(menPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});