const onSalePage = require('../pageObjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Entertainment category', () => {
        const entertainmentPage = 'c/offers/sale-electrical',
            category = 'entertainment';
        onSalePage.open(entertainmentPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});