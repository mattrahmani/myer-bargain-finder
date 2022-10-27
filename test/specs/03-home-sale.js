const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', function () {
    this.retries(2);

    it('should find bargains in Home category', () => {
        const homePage = 'c/offers/home--sale',
            category = 'home';
        discount = process.env.DISCOUNT || 70;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(homePage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});