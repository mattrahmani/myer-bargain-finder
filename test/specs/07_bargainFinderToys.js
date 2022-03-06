const onSalePage = require('../pageObjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Toys category', () => {
        const toysPage = 'c/offers/sale-toys',
            category = 'toys';
        onSalePage.open(toysPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});