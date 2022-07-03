const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("fruitsDB");

    console.log("Connected successfully to server");

    // create a document to insert
    const collection = database.collection("fruits");

    // Uncomment bellow to create the test fruits

    // const item = [
    //   {
    //     name: "Apple",
    //     score: 8,
    //     review: "Great fruit",
    //   },
    //   {
    //     name: "Orange",
    //     score: 6,
    //     review: "Kinda sour",
    //   },
    //   {
    //     name: "Banana",
    //     score: 9,
    //     review: "Great stuff!",
    //   },
    // ];
    // const result = await collection.insertMany(item);
    // console.log("Many documents was inserted in the fruits collection");

    // Query for a movie that has the title 'The Room'
    const query = {};
    const options = {
      // sort matched documents in descending order by rating
      sort: { score: -1 },
      // Include only the `title` and `imdb` fields in the returned document
      //   projection: { _id: 0, title: 1, imdb: 1 },
    };
    const fruits = await collection.find(query, options).toArray();

    // since this method returns the matched document, not a cursor, print it directly
    console.log(fruits);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
