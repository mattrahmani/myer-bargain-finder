const onSalePage = require('../pageObjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Men category', () => {
        const menPage = 'c/offers/men-739052-1',
            category = 'men';
        onSalePage.open(menPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});