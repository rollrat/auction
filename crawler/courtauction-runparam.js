// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const puppeteer = require("puppeteer");
const fs = require("fs");

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.courtauction.go.kr/");
  var frame = await page.waitForFrame(async (frame) => {
    return frame.name() === "indexFrame";
  });
  await frame.waitForSelector("#main_btn");

  var data = JSON.parse(fs.readFileSync("result.txt"));

  //   console.log(data);

  //   javascript: detailCaseSrch("서울중앙지방법원", "20180130100916", "1");

  // 물건상세검색
  await frame.evaluate(() => fastSrch());

  const dataLen = Object.keys(data).length;

  for (var i = 0; i < dataLen; i++) {
    try {
      // await delay(1000);
      console.log('wait .Ltbl_list');
      await frame.waitForSelector(".Ltbl_list");
      // await frame.waitForSelector(".Ltbl_list_lvl0");

      console.log(`Progress: [${i}/${dataLen}]`);
      console.log(data[i].param);
      // 사건내역
      // await frame.evaluate(
      //   (e) => detailCaseSrch(e[0], e[1].trim(), e[2]),
      //   data[i].param
      // );
      // 물건 내역
      console.log('eval detailSrch');
      await frame.evaluate(
        (e) => detailSrch(e[0], e[1].trim(), e[2]),
        data[i].param
      );

      console.log('wait .Ltbl_dt, #wrong_gd');
      await frame.waitForSelector(".Ltbl_dt, #wrong_gd");

      // 현재 선택하신 물건은 공고중인 물건이 아닙니다.
      if ((await frame.$("#wrong_gd")) != null) {
        console.log("skipped");
        continue;
      }

      async function showOuterHtml(element) {
        const data = await element.evaluate((e) => e.outerHTML);
        console.log(data);
      }

      async function getAttr(element, attr) {
        return await frame.evaluate(
          (e, attr) => e.getAttribute(attr),
          element,
          attr
        );
      }

      // 이미지 가져오기
      console.log('get images');
      var photo_urls = [];
      for (var k = 0; ; k++) {
        var imgs = await frame.$$(`div#photo${k} img`);
        if (imgs.length == 0) break;
        for (var j = 0; j < imgs.length; j++) {
          photo_urls.push((await getAttr(imgs[j], "src")).replace(/T_/gi, ""));
        }
      }

      console.log(photo_urls);

      // 이전으로
      console.log('eval porBefSrnActSubmit');
      await frame.evaluate(() => porBefSrnActSubmit());
    } catch (e) {
      console.log(e);
      try {
        await page.goto("https://www.courtauction.go.kr/");
        frame = await page.waitForFrame(async (frame) => {
          return frame.name() === "indexFrame";
        });
        await frame.waitForSelector("#main_btn");
        await frame.evaluate(() => fastSrch());

      } catch (e) {
      }
      i--;
    }
  }

  await browser.close();
})();
