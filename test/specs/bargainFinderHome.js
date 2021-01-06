const SalePage = require('../pageobjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Home category', () => {
        let homePage = 'w16-home';
        SalePage.open(homePage);
        SalePage.bargainFinder('home');
        console.log('=====>>> Home bargains search is finished <<<=====\n')
    });
});