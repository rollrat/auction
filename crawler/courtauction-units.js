// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const puppeteer = require("puppeteer");
const fs = require("fs");

async function showOuterHtml(element) {
  const data = await element.evaluate((e) => e.outerHTML);
  console.log(data);
}

async function getAttr(frame, element, attr) {
  return await frame.evaluate((e, attr) => e.getAttribute(attr), element, attr);
}

async function getSubNodeTexts(frame, element) {
  return await frame.evaluate((e) => {
    function printChildNodeText(e) {
      var texts = [];
      for (const child of e.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          var text = child.textContent.trim();
          if (text != "") texts.push(text);
        } else {
          texts.push(...printChildNodeText(child));
        }
      }
      return texts;
    }
    return printChildNodeText(e);
  }, element);
}

async function unitObjectDetailSearch(e) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.courtauction.go.kr/");
  var frame = await page.waitForFrame(async (frame) => {
    return frame.name() === "indexFrame";
  });
  await frame.waitForSelector("#main_btn");

  // 물건상세검색
  await frame.evaluate(() => fastSrch());
  await frame.waitForSelector(".Ltbl_list", { timeout: 500 });
  await frame.evaluate((e) => detailSrch(e[0], e[1].trim(), e[2]), e);
  await frame.waitForSelector(".Ltbl_dt, #wrong_gd");

  if ((await frame.$("#wrong_gd")) != null) {
    console.log("outdated");
  } else {
    const dataRaw = await frame.evaluate(
      () => document.querySelector("*").outerHTML
    );

    console.log (dataRaw);
  }

  await browser.close();
}

unitObjectDetailSearch(["의정부지방법원", " 20200130078489", "2"]);
