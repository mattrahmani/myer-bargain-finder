const SalePage = require('../pageObjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Men category', () => {
        let menPage = 'c/offers/men-739052-1';
        SalePage.open(menPage);
        SalePage.bargainFinder('men');
        console.log('=====>>> Men bargains search is finished <<<=====\n')
    });
});


