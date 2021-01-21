const SalePage = require('../pageObjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Home category', () => {
        let homePage = 'c/offers/w16-home';
        SalePage.open(homePage);
        SalePage.bargainFinder('home');
        console.log('=====>>> Home bargains search is finished <<<=====\n')
    });
});