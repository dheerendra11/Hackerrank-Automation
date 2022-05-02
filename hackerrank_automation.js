// npm install minimist 
// npm install puppeteer -g

// node hackerrank_automation.js --url=https://www.hackerrank.com/ --config=config.json

let minimist = require("minimist");
let puppeteer = require("puppeteer");
let fs = require("fs");

let args = minimist(process.argv);

let configdata = fs.readFileSync(args.config);
let data = JSON.parse(configdata);

// console.log(data.username);
// console.log(data.moderator);

async function run(){
 const browser = await puppeteer.launch({
     headless: false,
     defaultViewport: null,
     args:  ['--start maximized']
 });

//  console.log(args.url);

 let pages = await browser.pages();
 let page = pages[0];

 await page.goto(args.url);

 await page.waitForSelector("a[data-event-action='Login']");
 await page.click("a[data-event-action='Login']");

 await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
 await page.click("a[href='https://www.hackerrank.com/login']");

 await page.waitForSelector("input[name='username']");
 await page.type("input[name='username']",data.username, {delay: 20});

 await page.waitForSelector("input[name='password']");
 await page.type("input[name='password']",data.password, {delay: 20});

 await page.waitForSelector("button.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
 await page.click("button.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");

 await page.waitForSelector("a[href='/submissions/all']");
 await page.click("a[href='/submissions/all']");

 await page.waitForSelector("a[data-attr1='Last']");
 let no_ofpages = await page.$eval("a[data-attr1='Last']",function(totalpage){
     let pagecount = parseInt(totalpage.getAttribute("data-page"));
     return pagecount;
 })
console.log(no_ofpages);

 

//  await page.waitFor(1000);
//  await browser.close();
}
run();

