// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const serviceKey = require("./private/service-key");
const openapi = require("./api/openapi");

openapi
  .requestGetKamcoPbctCltrList(serviceKey, {
    numOfRows: 100,
    pageNo: 1,
    DPSL_MTD_CD: "0001",
    SIDO: "인천광역시",
    SGK: "미추홀구",
    // PBCT_BEGN_DTM: 20220101
  })
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  });
