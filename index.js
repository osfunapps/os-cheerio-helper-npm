const cheerio = require('cheerio')
const tools = require('os-tools')

const self = module.exports = {

    /**
     * will return the dom as a cheerio element
     * @returns {Promise<*>}
     */
    getCheerioDom: async function (page) {
        const eleHandle = await page.$('body');
        const innerHTML = await page.evaluate(body => body.innerHTML, eleHandle);
        const $ = cheerio.load(innerHTML)
        require('cheerio-get-css-selector').init($);
        return $
    },

    /**
     * will return all of the child nodes of a given cheerio element
     */
    getChildNodes: function (cheerioEle) {
        return cheerioEle.contents()
    },

    /**
     * will return a specific node from nodes list
     */
    getElementAt: function(cheerioChildrenEle, idx){
        return cheerioChildrenEle.eq(idx)
    },

    /**
     * will return the :th child node
     */
    getChildAt: async function(parentEle, childAtIdx){
        return (await self.getChildNodes(parentEle)).eq(childAtIdx)
    },



    /**
     * will return an element from the cheerio dom
     */
    getElementFromDom: function (cheerioDom, selector) {
        return cheerioDom(selector)
    },/**

     * will return an element from a cheerio element
     */
    getElements: function (cheerioElement, selector) {
        return cheerioElement.find(selector)
    },

    /**
     * will return an element from the dom
     */
    getElementByText: function (cheerioEle, text) {
        return cheerioEle.find(":contains('"+text+"')")
    },

    /**
     * will return the attrib value of an element
     */
    getAttributeValueFromCheerioEle: function (cheerioEle, attrib) {
        return cheerioEle.attr(attrib)
    },

    /**
     * will wait for an element to change it's value
     */
    waitForSelectorToChangeAttValue: async function (page, selector, att, val, checkEach = 3000) {
        while (true) {
            try {
            let cheerioDom = await self.getCheerioDom(page)
                await tools.delay(checkEach)
                let ele = await self.getElementFromDom(cheerioDom, selector)
                let eleVal = await self.getAttributeValueFromCheerioEle(ele, att)
                if (eleVal === val)
                    return
            } catch (e) {

            }
        }
    },

    /**
     * Will loop on a <select> element children (<option> tags) and look for a given text.
     * Optionally: if the text exists, will select it.
     * NOTICE: if you want to select the option, you need to supply a puppeteer helper instance,
     * a page instance, and toggle the selectIfExists to true
     * @param selectCheerioEle -> cheerio element. Scrape the dom first with getCheerioDom(page)
     * then with getElementFromDom(selector) find your element
     * @param reqText -> the text of the option to look for
     * @param selectIfExists -> true to select
     * @param page -> puppeteer page, if you want to select the option
     * @param ph -> optional PuppeteerHelper.js instance you created, if you want to select the option
     * @param delayAfterSelect -> if you chose
     */
    isSelectHasValue: async function (selectCheerioEle,
                                      reqText,
                                      selectIfExists = false,
                                      ph = null,
                                      page = null,
                                      delayAfterSelect = 0) {
        let options = await self.getChildNodes(selectCheerioEle)

        for(let i = 0; i < options.length; i++){
            let currEle = options.eq(i)
            if (currEle.text() === reqText) {
                if (selectIfExists) {
                    let reqValue = await self.getAttributeValueFromCheerioEle(currEle, "value")
                    await ph.selectByValue(page, self.getUniqueSelector(selectCheerioEle), reqValue,delayAfterSelect)
                }
                return true
            }
        }
        return false
    },

    /**
     * will return a unique selector for the cheerio element
     */
    getUniqueSelector: function (cheerioEle) {
        return cheerioEle.getUniqueSelector()
    },

    /**
     * will return the text from an element
     */
    getTextFromElement: function (cheerioEle) {
        return cheerioEle.text()
    }


};

