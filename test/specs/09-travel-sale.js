const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', function () {
    this.retries(2);

    it('should find bargains in Travel & Tech category', () => {
        const page = 'c/offers/travel-tech-sale',
            category = 'travel and tech';
        discount = process.env.DISCOUNT || 50;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(page);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.findBargains(category);
    });
});