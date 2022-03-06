const onSalePage = require('../pageObjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Home category', () => {
        const homePage = 'c/offers/w16-home',
            category = 'home';
        onSalePage.open(homePage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});