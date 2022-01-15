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
  const frame = await page.waitForFrame(async (frame) => {
    return frame.name() === "indexFrame";
  });
  await frame.waitForSelector("#main_btn");
  // 물건상세검색
  await frame.evaluate(() => fastSrch());
  await frame.waitForSelector(".Ltbl_list");

  var courtIndex = 0;
  // var maxCourtCount = 59;
  var maxCourtCount = 59;
  var results = [];

  while (true) {
    console.log(`[Court] ${courtIndex + 1}/${maxCourtCount}`);

    // 물건상세검색 페이지
    await frame.evaluate(() =>
      porActSubmit("", "InitMulSrch.laf", "", "PNO102001")
    );
    await frame.waitForSelector(".Ltbl_dt");
    // const 법원 = await frame.evaluate(() => {
    //   var result = [];
    //   var select = document.getElementById("idJiwonNm");
    //   for (var i = 0; i < select.length; i++) {
    //     if (select[i].text != "전체") result.push(select[i].text);
    //   }
    //   return result;
    // });
    // 법원 선택
    await frame.evaluate((index) => {
      document
        .getElementById("idJiwonNm")
        .options[index].setAttribute("selected", "selected");
    }, courtIndex);
    // 검색 클릭
    await frame.evaluate(() => srch());

    var pageCount = 59;

    while (true) {
      console.log(`[Court-Page] ${pageCount}`);

      await frame.waitForSelector(".Ltbl_list");

      var ll = await frame.$$(".Ltbl_list tbody tr");

      async function getText(element) {
        return (await frame.evaluate((e) => e.textContent, element)).trim();
      }

      //   async function getOnlyText(element) {
      //     return await frame.evaluate((e) => {
      //       for (const child of e.childNodes) {
      //         if (child.nodeType === Node.TEXT_NODE) {
      //           return child.textContent;
      //         }
      //       }
      //       return null;
      //     }, element);
      //   }

      async function showOuterHtml(element) {
        const data = await element.evaluate((e) => e.outerHTML);
        console.log(data);
      }

      async function getSubNodeTexts(element) {
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

      async function getAttr(element, attr) {
        return await frame.evaluate(
          (e, attr) => e.getAttribute(attr),
          element,
          attr
        );
      }

      try {
        for (var i = 0; i < ll.length; i++) {
          var openScript = await getAttr(
            await (await ll[i].$$("td"))[1].$("a"),
            "onclick"
          );
          var scriptParams = openScript
            .replace(/\s\s+/g, " ")
            .split("(")[1]
            .split(")")[0]
            .split(",")
            .map((e) => e.replace(/'/gi, ""));
          var 사건번호 = await getSubNodeTexts((await ll[i].$$("td"))[1]);
          var 물건번호 = await getSubNodeTexts((await ll[i].$$("td"))[2]);
          var 소재지 = await getSubNodeTexts((await ll[i].$$("td"))[3]);
          var 비고 = await getSubNodeTexts((await ll[i].$$("td"))[4]);
          var 감정평가액 = await getSubNodeTexts((await ll[i].$$("td"))[5]);
          var 진행상태 = await getSubNodeTexts((await ll[i].$$("td"))[6]);

          // console.log(scriptParams);
          // console.log(사건번호);
          // console.log(물건번호);
          // console.log(소재지);
          // console.log(비고);
          // console.log(감정평가액);
          // console.log(진행상태);

          results.push({
            param: scriptParams,
            s1: 사건번호,
            s2: 물건번호,
            s3: 소재지,
            s4: 비고,
            s5: 감정평가액,
            s6: 진행상태,
          });
        }
      } catch (e) {
        break;
      }

      pageCount += 20;

      await frame.evaluate(
        (pageCount) => goPage(pageCount),
        pageCount.toString()
      );
      await delay(500);
    }

    courtIndex += 1;

    if (maxCourtCount <= courtIndex) break;

    await delay(500);
  }

  // 케이스 검색 (사건번호 상세 검색)
  // javascript:detailCaseSrch('서울중앙지방법원',
  // '20180130100916','1'); return false;

  //   const data = await frame.evaluate(
  //     () => document.querySelector("*").outerHTML
  //   );

  //   console.log(data);

  fs.writeSync(fs.openSync("result.txt", "w"), JSON.stringify(results));

  await browser.close();
})();
