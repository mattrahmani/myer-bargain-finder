const SalePage = require('../pageobjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Women category', () => {
        let womenPage = 'c/offers/women-739051-1';
        SalePage.open(womenPage);
        SalePage.bargainFinder('women');
        console.log('=====>>> Women bargains search is finished <<<=====\n')
    });
});


