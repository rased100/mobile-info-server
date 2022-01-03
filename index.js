const express = require('express');
const { MongoClient } = require('mongodb');
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
        const productCollection = database.collection('product');


        //Get Products Api
        app.get('/product', async (req, res) => {
            const cursor = productCollection.find({});
            // const product = await cursor.toArray();
            const product = await cursor.limit(8).toArray();
            res.send(product)
        })
        //Get /moreproduct Api
        app.get('/moreproduct', async (req, res) => {
            const cursor = productCollection.find({});
            const product = await cursor.toArray();
            res.send(product)
        })
        //POST addProduct
        app.post('/product', async (req, res) => {
            const product = req.body;
            // console.log(item);
            const result = await productCollection.insertOne(product)
            // console.log(result);
            res.json(result)
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