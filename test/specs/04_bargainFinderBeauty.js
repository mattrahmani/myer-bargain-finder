const onSalePage = require('../pageObjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Beauty category', () => {
        const womenPage = 'c/offers/beauty-737623-1',
            category = 'beauty';
        onSalePage.open(womenPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});