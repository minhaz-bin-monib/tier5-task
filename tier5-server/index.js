const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//use middleware
app.use(cors());
app.use(express.json());

// dbuser1
// tIo5ExMNeAgszEZ2





const uri = "mongodb+srv://dbuser1:tIo5ExMNeAgszEZ2@cluster0.gaxjy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const usersCollection =  client.db("foodExpress").collection("users");

        const user ={name: 'dia', email:'dia@gmail.com'};
        const result = await usersCollection.insertOne(user);
        console.log(`User inserted with id: ${result.insertedId}`);
    }
    finally{
        await client.close();
    }

}

run().catch(console.dir);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gaxjy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;



require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 5000;
app.get('/', (req, res) => {
  res.send('hello from  super child server')

})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("superChildCare").collection("services");
  const orderCollection = client.db("superChildCare").collection("orders");
  const adminCollection = client.db("superChildCare").collection("admins");
  const reviewCollection = client.db("superChildCare").collection("reviews");




  app.post("/addServices", (req, res) => {
    const newEvent = req.body;
    console.log('adding new books: ', newEvent)
    serviceCollection.insertOne(newEvent)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(res.insertedCount > 0)

      })
  })


  app.get("/serviceDetail", (req, res) => {
    serviceCollection.find()
      .toArray((err, result) => {
        res.send(result)
      })
  })




  app.post("/addOrders", (req, res) => {
    const newOrder = req.body;
    console.log('adding new services: ', newOrder)
    orderCollection.insertOne(newOrder)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(res.insertedCount > 0)
      })
  })


  app.get("/orders", (req, res) => {
    console.log(req.query.email)
    orderCollection.find({ userEmail: req.query.email })
      .toArray((err, result) => {
        res.send(result)
      })
  })


  app.get("/allOrder", (req, res) => {
    orderCollection.find()
      .toArray((err, result) => {
        res.send(result)
      })
  })





  app.patch("/allOrder/:id", (req, res) => {
    console.log(req.body)
    orderCollection.updateOne({ _id: ObjectId(req.params.id) },
      {
        $set: { status: req.body }

      })
      .then(result => {
        console.log(result)
      })

  })


  
  app.post("/makeAdmin", (req, res) => {
    const newEvent = req.body;
    console.log('adding new admin: ', newEvent)
    adminCollection.insertOne(newEvent)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(res.insertedCount > 0)

      })
  })


  app.get("/getAdmin", (req, res) => {
    adminCollection.find()
      .toArray((err, result) => {
        res.send(result)
      })
  })





  app.delete("/delete/:id", (req,res)=>{
    console.log(req.params.id)
    serviceCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then( result=>{
      console.log(result)
    })
  })



  app.post("/reviews", (req, res) => {
    const newEvent = req.body;
    console.log('adding new admin: ', newEvent)
    reviewCollection.insertOne(newEvent)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(res.insertedCount > 0)

      })
  })

  app.get("/getReview", (req, res) => {
    reviewCollection.find()
      .toArray((err, result) => {
        res.send(result)
      })
  })









});





app.listen(process.env.PORT || port)

app.get('/', (req, res) => {
    res.send('Running My Node CRUD Server');
});

app.listen(port, () => {
    console.log('CRUD Server is running');
})


