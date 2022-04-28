#

## init

```
mongoimport --jsonArray --db ca --collection docs --file result-params.json
# 법원이름
db.docs.createIndex({"info.courtName":1})
# 사건번호
db.docs.createIndex({"info.eventNumber":1})
# 감정평가액
db.docs.createIndex({"info.appraisedValue":1})
# 최저매각가격
db.docs.createIndex({"info.minSellingPrice":1})
# 매각기일
db.docs.createIndex({"info.saleDate":1})
```

### query

```
# 법원이름으로 검색
db.docs.find({"header.param.0": "서울지방법원"})
db.docs.find({"info.courtName": "서울지방법원"})

db.docs.aggregate({"$group": {"_id": "$info.courtName", count: { $sum: 1 }}})
db.docs.mapReduce(
    function() {
        emit(this.info.courtName, 1);
    },
    function(key, values) {
        return Array.sum(values);
    },
    {
        out: { inline: 1 }
    }
)
db.docs.aggregate([
    { $project: { "info.courtName": 1, }, },
    { $group: { _id: "$info.courtName", count: { $sum: 1 } } },
    { $sort: { 'count': -1 } }
])
```
