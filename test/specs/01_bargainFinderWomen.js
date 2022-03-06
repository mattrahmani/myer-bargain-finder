const onSalePage = require('../pageObjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Women category', () => {
        const womenPage = 'c/offers/women-739051-1',
            category = 'women';
        onSalePage.open(womenPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});