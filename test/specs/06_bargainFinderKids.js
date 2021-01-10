const SalePage = require('../pageobjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Kids category', () => {
        let kidsPage = 'c/offers/kids-739053-1';
        SalePage.open(kidsPage);
        SalePage.bargainFinder('kids');
        console.log('=====>>> Kids bargains search is finished <<<=====\n')
    });
});


