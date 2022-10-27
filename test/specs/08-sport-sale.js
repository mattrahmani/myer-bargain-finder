const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', function () {
    this.retries(2);

    it('should find bargains in Sport category', () => {
        const toysPage = 'c/offers/sport-sale',
            category = 'sport';
        discount = process.env.DISCOUNT || 70;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(toysPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});