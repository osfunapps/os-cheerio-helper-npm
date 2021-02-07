Introduction
------------

This project meant to provide intuitive functions to use cheeriojs, without wasting time.

## When to use this library
If you just want to make an automated program, for navigating to a website and click on buttons, fill forms etc... so you should only use [os-puppeteer](https://www.npmjs.com/package/os-puppeteer-helper).

Else you want to analyze a DOM of a website more thoroughly, this is the library.


## Installation and use

The cheerio helper works in hand with [os-puppeteer](https://github.com/osfunapps/os-puppeteer-helper-npm). So you'll need to npm i it too. 

Install via npm:
    
    npm i os-puppeteer-helper
    npm i os-cheerio-helper
        
Require ch and ph:
```js
var ch = require("os-cheerio-helper")
var ph = require("os-puppeteer-helper")
 ```

## Quick start

Create a browser:     
```js    
let bt = await ph.createBrowser(url, slowMo = 5, headless = false, width = 1300, height = 768)
    
// save the page and the browser
let browser = bt[0];
let page = bt[1];
```
        
Scrape the DOM:
```js
let dom = await ch.getCheerioDom(page);
```

Find an element by a selector:
```js
let receiptContainerList = await ch.getElementFromDom(dom, "tbody[id='the-list'] tr");
```
Get the first element from a list of elements:
```js
let firstContainer = await ch.getElementAt(receiptContainerList, 0)
```
Get text from element:
```js
await ch.getTextFromElement(firstContainer)   
``` 
Get other attribute value from element:
```js
await ch.getAttributeValueFromCheerioEle(firstContainer, "class")   
```                 
Tell the Puppeteer Helper to click on this element:  
```js
await ph.click(page, ch.getUniqueSelector(firstContainer));
```    
Find an element from the DOM, carrying a specific text:
```js
let divWithTxt = await ch.getElementByText(dom, "Hello World!")    
```
Will wait for an element to change it's value (div with a "popup" class to change it's style from display="inline" to display="none" ):
```js
await ch.waitForSelectorToChangeAttValue(page, selector="div.popup", att="style", val="display: none;", checkEach=2000)
```
Will loop on a 'select' element children ('option' tags) and look for a given text.\
Optionally: if the text exists, will select it.\
NOTICE: if you want to select the option, you need to supply a puppeteer helper instance, a page instance, and toggle the selectIfExists to true:
```js
let selected = await ch.isSelectHasValue(selectElement, "black", true, ph, page);
```        
And a lot more!

## Links
[npm os-puppeteer-helper](https://www.npmjs.com/package/os-puppeteer-helper)\
[npm os-cheerio-helper](https://www.npmjs.com/package/os-cheerio-helper)

## Licence
ISC

# os-cheerio-helper-npm
