const SalePage = require('../pageobjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Toys category', () => {
        let toysPage = 'c/offers/sale-toys';
        SalePage.open(toysPage);
        SalePage.bargainFinder('toys');
        console.log('=====>>> Toys bargains search is finished <<<=====\n')
    });
});


