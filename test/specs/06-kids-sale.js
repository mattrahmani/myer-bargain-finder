const onSalePage = require('../pageobjects/sale-page');

describe('Myer bargain finder', function () {
    this.retries(2);

    it('should find bargains in Kids category', () => {
        const kidsPage = 'c/offers/kids-sale',
            category = 'kids';
        discount = process.env.DISCOUNT || 60;
        console.log('Discount rate in ' + category + ' category --->>> ' + discount);
        onSalePage.open(kidsPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.findBargains(category);
    });
});