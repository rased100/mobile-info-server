const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleWare
app.use(cors())
app.use(express.json())

//DB_USER=p-hero-team-project
//DB_PASS=lccE9DI2msfv1pzC



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oewpu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run() {
    try {
        await client.connect();
        console.log('database connected successfully');
        const database = client.db('pheroteam');
        const itemsCollection = database.collection('items');
        const orderCollection = database.collection('order');
        const reviewCollection = database.collection('review');


        //Get Products Api
<<<<<<< HEAD
        app.get('/product', async (req, res) => {
            const cursor = productCollection.find({});
            // const product = await cursor.toArray();
            const product = await cursor.limit(8).toArray();
            res.send(product)
=======
        app.get('/items', async (req, res) => {
            const cursor = itemsCollection.find({});
            const items = await cursor.limit(8).toArray();
            res.send(items)
>>>>>>> 917e496f8ca3df602eafe9ac78a0dcb3eeda887b
        })
        //Get MoreItems Api
        app.get('/moreitems', async (req, res) => {
            const cursor = itemsCollection.find({});
            const items = await cursor.toArray();
            res.send(items)
        })
        //POST additems API
        app.post('/items', async (req, res) => {
            const item = req.body;
            // console.log(item);
            const result = await itemsCollection.insertOne(item)
            // console.log(result);
            res.json(result)
        })

        //Get single services
        app.get('/items/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) };
            const item = await itemsCollection.findOne(query);
            res.json(item)
        })

        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order)
            // console.log('order', result);
            res.json(result)
        })

        //my order
        app.get('/myorders', async (req, res) => {
            const query = { email: req.query.email }
            const cursor = await orderCollection.find(query).toArray()
            res.json(cursor)

        })
        app.put('/myorders', async (req, res) => {
            const filter = { _id: ObjectId(req.query.id) }
            const options = { upsert: true }
            const updateDocument = {
                $set: {
                    status: 'Shipped'
                }
            }
            const result = await orderCollection.updateOne(filter, updateDocument, options)
            res.send(result)
        })
        app.delete('/allOrders/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.json(result)
        })
        //ManageAllorders
        app.get("/allOrders", async (req, res) => {
            const result = await orderCollection.find({}).toArray();
            res.json(result);
        });

        app.put('/allorders', async (req, res) => {
            const filter = { _id: ObjectId(req.query.id) }
            const options = { upsert: true }
            const updateDocument = {
                $set: {
                    status: 'Approved'
                }
            }
            const result = await orderCollection.updateOne(filter, updateDocument, options)
            res.send(result)
        })
        app.delete('/moreitems/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) };
            const result = await itemsCollection.deleteOne(query);
            res.json(result)
        })

        // review
        app.post("/addReview", async (req, res) => {
            const user = req.body
            const result = await reviewCollection.insertOne(user);
            res.send(result);
        });
        app.get('/review', async (req, res) => {
            const cursor = await reviewCollection.find({}).toArray()
            res.json(cursor)

        })
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Running p-hero-team server')

});
app.listen(port, () => {
    console.log('Running in port', port);
});