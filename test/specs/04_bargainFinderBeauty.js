const SalePage = require('../pageObjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Beauty category', () => {
        let beautyPage = 'c/offers/beauty-737623-1';
        SalePage.open(beautyPage);
        SalePage.bargainFinder('beauty');
        console.log('=====>>> Beauty bargains search is finished <<<=====\n')
    });
});


