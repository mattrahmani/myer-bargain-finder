const SalePage = require('../pageObjects/sale.page');

describe('Myer bargain finder', () => {

    it('should find bargains from Entertainment category', () => {
        let entertainmentPage = 'c/offers/sale-electrical';
        SalePage.open(entertainmentPage);
        SalePage.bargainFinder('entertainment');
        console.log('=====>>> Entertainment bargains search is finished <<<=====\n')
    });
});


