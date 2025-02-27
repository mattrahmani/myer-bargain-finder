const { assert } = require("chai");
const Page = require("./page");
const fs = require("fs");
const path = require("path");
let items = 0,
  screenshotSubFolder,
  existingItems,
  lastPageNumber,
  today,
  totalItems = 0;

class SalePage extends Page {
  get products() {
    return $$("div[data-automation=product]");
  }
  get nextBtn() {
    return $("a=Next");
  }
  get pageHeader() {
    return $("h1.css-1sfahi1");
  }
  get totalItemsContainer() {
    return $("span[data-automation=product-total]");
  }
  get paginateContainer() {
    return $("#paginationContainer");
  }
  get paginateContainerList() {
    return this.paginateContainer.$$("li");
  }

  open(extension) {
    return super.open(extension);
  }

  confirmScreenshotFolderIsExisting(category) {
    let screenshotMainFolder = "screenshots/";
    if (!fs.existsSync(screenshotMainFolder)) {
      fs.mkdirSync(screenshotMainFolder);
    }
    screenshotSubFolder = "screenshots/" + category + "/";
    if (!fs.existsSync(screenshotSubFolder)) {
      fs.mkdirSync(screenshotSubFolder);
      return screenshotSubFolder;
    }
  }

  findBargains(category) {
    existingItems = this.getExistingItems('./screenshots');
    this.getLastPageNumber();
    today = this.getTodayDate();
    totalItems = this.getNumber(this.totalItemsContainer.getText());
    let currentPage = 1;

    while (currentPage <= lastPageNumber) {
      console.log(
        category + " --->> page " + currentPage + " of " + lastPageNumber
      );
      this.discountCalculator(category);
      currentPage++;
      if (this.nextBtn.isDisplayed()) {
        this.nextBtn.waitForClickable();
        this.nextBtn.click();
        browser.waitUntil(
          () => browser.getUrl().includes("pageNumber=" + currentPage),
          { timeout: 60000 }
        );
      }
    }
    assert.equal(
      currentPage - 1,
      lastPageNumber,
      "=====>>> Some pages are missing <<<====="
    );
    console.log(
      "=====>>> " +
        category +
        " bargains search is finished after scanning " +
        totalItems +
        " items <<<=====\n"
    );
  }

  discountCalculator(category) {
    let productBrand,
      productName,
      priceNow,
      priceWas,
      percent,
      filePath,
      name,
      extraDiscount,
      discountRate,
      priceBlockHTML;

    this.products.forEach((product) => {
      try {
        items++;
        product.waitForDisplayed();
        priceBlockHTML = product
          .$("div[data-automation=product-price]")
          .getHTML();

        if (
          priceBlockHTML.includes("product-price-was") &&
          priceBlockHTML.includes("product-price-now")
        ) {
          priceWas = this.getPriceWas(product);
          priceNow = this.getPriceNow(product);

          if (product.$("div[data-automation=product-label]").isExisting()) {
            const productText = product.getText();
            if (productText.includes("further") && productText.includes("%")) {
              if (product.$("a*=Take a further").isExisting()) {
                extraDiscount = product
                  .$("a*=Take a further")
                  .getText()
                  .split(" ");
              } else {
                extraDiscount = product
                  .$("span*=Take a further")
                  .getText()
                  .split(" ");
              }
              discountRate = extraDiscount[3].slice(0, 2);
              priceNow = priceNow - (priceNow * discountRate) / 100;
            }
          }

          percent = ((1 - priceNow / priceWas) * 100).toFixed(0);
          if (percent >= Number(discount)) {
            if (
              !product.$("div.small-text").isExisting() ||
              !product.$("div.small-text").getText().includes("Out of stock")
            ) {
              if (
                product.$("span[data-automation=product-brand").isExisting()
              ) {
                productBrand = product
                  .$("span[data-automation=product-brand]")
                  .getText();
              } else {
                productBrand = "";
              }
              productName = product
                .$("span[data-automation=product-name]")
                .getText();
              name = productBrand + " " + productName;
              name = name.split(".").join("").split("/").join("");
              priceNow = Number(priceNow).toFixed(0);
              let itemName =
                percent + "% Off (Now $" + priceNow + ") " + name + ".png";
              filePath =
                screenshotSubFolder +
                today +
                "--> " +
                percent +
                "% Off (Now $" +
                priceNow +
                ") " +
                name +
                ".png";
              if (!existingItems.includes(itemName)) {
                product.scrollIntoView(false);
                browser.waitUntil(() => product.$("img").isDisplayed(), {
                  timeout: 30000
                });
                browser.pause(1000);
                product.saveScreenshot(filePath);
              }
            }
          }
        }
      } catch (error) {
        console.log("An error happened while scanning --->> " + name);
        product.scrollIntoView();
        this.drawHighlight(product);
        filePath = "errorScreenshot/" + category + " error.png";
        browser.saveScreenshot(filePath);
        this.removeHighlight(product);
        throw error;
      }
    });
  }

  getExistingItems(directory) {
    if (!fs.existsSync(directory)) return [];
    
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    return entries.reduce((acc, entry) => {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            acc.push(...this.getExistingItems(fullPath));
        } else if (entry.name.endsWith(".png")) {
            const newItem = entry.name.split("--> ")[1];
            if (newItem) {
              acc.push(newItem);
            }
        }
        return acc;
    }, []);
  }  
  
  getNumber(text) {
    let numberText = text.split(" ");
    let textNumber = numberText[0].split(",").join("");
    return Number(textNumber);
  }

  getTodayDate() {
    let date = new Date();
    today =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    return today;
  }

  getLastPageNumber() {
    if (this.paginateContainer.isExisting()) {
      lastPageNumber = Number(
        this.paginateContainerList[
          this.paginateContainerList.length - 1
        ].getText()
      );
    } else {
      lastPageNumber = 1;
    }
    return lastPageNumber;
  }

  getPrice(text) {
    let price;
    price = text.slice(1);
    return price;
  }

  getPriceWas(product) {
    let priceWasTxt = product
      .$("span[data-automation=product-price-was]")
      .getText();
    let priceWas = this.getPrice(priceWasTxt);
    return priceWas;
  }

  getPriceNow(product) {
    let priceNowTxt = product
      .$("span[data-automation=product-price-now]")
      .getText();
    let priceNow = this.getPrice(priceNowTxt);
    return priceNow;
  }
}

module.exports = new SalePage();
