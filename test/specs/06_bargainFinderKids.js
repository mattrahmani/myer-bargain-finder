const onSalePage = require('../pageObjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Kids category', () => {
        const kidsPage = 'c/offers/kids-739053-1',
            category = 'kids';
        onSalePage.open(kidsPage);
        onSalePage.confirmScreenshotFolderIsExisting(category);
        onSalePage.getExistingItems();
        onSalePage.findBargains(category);
    });
});