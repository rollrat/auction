
const { MongoClient } = require("mongodb");
const uri =
  "mongodb://localhost:27017/?maxPoolSize=20&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

// fs.readFile('result-params', 'utf8', function (err, data) {
//   if (err) throw err;
//   console.log(data);
//   var json = JSON.parse(data);

//   db.configurations.insert(json, function(err, doc) {
//       console.log(data);
//       if(err) throw err;
//   });
// });