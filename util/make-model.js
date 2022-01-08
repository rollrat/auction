const fs = require("fs");
const readline = require("readline");

var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("model-raw.txt"),
});

lineReader.on("line", function (line) {
  var name_kr = line.split("\t")[0];
  var name_eng = line.split("\t")[1];

  console.log(`/// ${name_kr}`);
  console.log(`String ${name_eng}() => _getValueByName('${name_eng}');`);
});
