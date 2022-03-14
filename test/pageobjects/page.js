/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
// let today, lastPageNumber;

module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        browser.maximizeWindow();
        return browser.url(`/${path}`);
    }

    drawHighlight(element) {
        browser.execute('arguments[0].style.outline = "#f00 solid 4px";', element);
    }

    removeHighlight(element) {
        browser.execute('arguments[0].style.outline = "#f00 solid 0px";', element);
    }
}
