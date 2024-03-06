const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', function () {
    this.retries(2);

    it('should find bargains in Clearance category', () => {
        const page = 'c/offers/clearance-offers',
            category = 'clearance';
        discount = process.env.DISCOUNT || 80;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(page);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.findBargains(category);
    });
});