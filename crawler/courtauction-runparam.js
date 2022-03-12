// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const puppeteer = require("puppeteer");
const fs = require("fs");
const { exit } = require("process");

if (process.argv.length < 4) {
  console.log("argument: <starts> <ends>");
  exit();
}

var starts = parseInt(process.argv[2]);
var ends = parseInt(process.argv[3]);

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

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

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.courtauction.go.kr/");
  var frame = await page.waitForFrame(async (frame) => {
    return frame.name() === "indexFrame";
  });
  await frame.waitForSelector("#main_btn");

  var data = JSON.parse(fs.readFileSync("result.json"));

  //   console.log(data);

  //   javascript: detailCaseSrch("서울중앙지방법원", "20180130100916", "1");

  // 물건상세검색
  await frame.evaluate(() => fastSrch());

  const dataLen = Object.keys(data).length;

  console.log(dataLen);

  var results = [];

  for (var i = starts; i < dataLen && i < ends; i++) {
    if (i % 100 == 99) {
      await delay(1000);
    }

    try {
      // await delay(1000);
      console.log("wait .Ltbl_list");
      await frame.waitForSelector(".Ltbl_list", { timeout: 500 });
      // await frame.waitForSelector(".Ltbl_list_lvl0");

      console.log(`Progress: [${i}/${dataLen}]`);
      console.log(data[i].param);

      /* 
      ------------------------------------------------
      
                      물건 내역
      
      ------------------------------------------------
      */

      var objInfo = {};

      objInfo["header"] = data[i];

      // 사건내역
      // await frame.evaluate(
      //   (e) => detailCaseSrch(e[0], e[1].trim(), e[2]),
      //   data[i].param
      // );
      // 물건 내역
      console.log("eval detailSrch");
      await frame.evaluate(
        (e) => detailSrch(e[0], e[1].trim(), e[2]),
        data[i].param
      );

      console.log("wait .Ltbl_dt, #wrong_gd");
      await frame.waitForSelector(".Ltbl_dt, #wrong_gd");

      // 현재 선택하신 물건은 공고중인 물건이 아닙니다.
      if ((await frame.$("#wrong_gd")) != null) {
        console.log("skipped");
        continue;
      }

      // const dataRaw = await frame.evaluate(
      //   () => document.querySelector("*").outerHTML
      // );

      // results.push({ data: data[i], raw: dataRaw });

      //
      //  1. 이미지 가져오기
      //
      console.log("get images");
      var photo_urls = [];
      for (var k = 0; ; k++) {
        var imgs = await frame.$$(`div#photo${k} img`);
        if (imgs.length == 0) break;
        for (var j = 0; j < imgs.length; j++) {
          photo_urls.push(
            (await getAttr(frame, imgs[j], "src")).replace(/T_/gi, "")
          );
        }
      }

      objInfo["photos"] = photo_urls;

      //
      //  2. 물건기본정보 표
      //
      {
        var tables = await frame.$$("table.Ltbl_dt");
        // [물건기본정보 표, 물건기본정보 표2, 사진, 감정평가요항표]
        {
          //
          //  2-1. 물건기본정보 표
          //
          {
            var trs = await tables[0].$$("tbody > tr");
            var t1 = await getSubNodeTexts(frame, trs[0]); // 사건번호, 물건번호, 물건종류
            var t2 = await getSubNodeTexts(frame, trs[1]); // 감정평가액, 최저매각가격, 입찰방법
            var t3 = await getSubNodeTexts(frame, trs[2]); // 매각기일
            var t4 = await getSubNodeTexts(frame, trs[3]); // 물건비고
            var t5 = await getSubNodeTexts(frame, trs[4]); // 목록1 소재지
            var t6 = await getSubNodeTexts(frame, trs[5]); // 담당

            objInfo["binfo1"] = [t1, t2, t3, t4, t5, t6];
          }

          //
          //  2-2. 물건기본정보 표2
          //
          {
            var trs = await tables[1].$$("tbody > tr");
            var t1 = await getSubNodeTexts(frame, trs[0]); // 사건접수, 경매개시일
            var t2 = await getSubNodeTexts(frame, trs[1]); // 배당요구종기, 청구금액

            objInfo["binfo2"] = [t1, t2];
          }

          //
          //  2-3. 감정평가요항표
          //
          {
            var trs = await tables[3].$$("tbody > tr");
            var eve = [];

            for (var trsi = 0; trsi < trs.length; trsi++) {
              eve.push(await getSubNodeTexts(frame, trs[trsi]));
            }

            objInfo["eve"] = [eve];
          }
        }
      }

      //
      //  3. 기일내역
      //
      {
        var table = (await frame.$$("table.Ltbl_list"))[0];
        // 기일, 기일종류, 기일장소, 최저매각가격, 기일결과
        var trs = await table.$$("tbody > tr");
        var dal = [];

        for (var trsi = 0; trsi < trs.length; trsi++) {
          dal.push(await getSubNodeTexts(frame, trs[trsi]));
        }

        objInfo["dal"] = dal;
      }

      //
      //  4. 목록내역
      //

      //
      //  5. 인근매각물건사례
      //

      //
      //  크롤링 데이터 삽입
      //
      results.push(objInfo);

      // 이전으로
      console.log("eval porBefSrnActSubmit");
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
      } catch (e) {}
      i--;
    }
  }

  fs.writeSync(
    fs.openSync(`result-params-${starts}.json`, "w"),
    JSON.stringify(results)
  );

  await browser.close();
})();
