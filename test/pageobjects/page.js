/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
get 
const username = 'mehdirahmani_1981@yahoo.com';
const password = 'decvos-4wapji-muSruq';



module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        browser.maximizeWindow();
        return browser.url(`https://www.myer.com.au/c/offers/${path}`);
    }

    login() {
        browser.url('https://www.myer.com.au/login?continue=%2Faccount&flow=account');
        
    }
}
