const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000;
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json()) 

console.log(process.env.SPORTS_PHOTOGRAPHER)
console.log(process.env.PASSWORD)

const uri = `mongodb+srv://${process.env.SPORTS_PHOTOGRAPHER}:${process.env.PASSWORD}@cluster0.t6zznhm.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const servicesCollection = client.db('photographer').collection('services')
        
        app.get('/services', async(req, res) => {
            const query = {}
            const cursor = servicesCollection.find(query)
            const service = await cursor.toArray()
            res.send(service)
        })

        app.get('/services/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const service = await servicesCollection.findOne(query)
            res.send(service)
        })
    }
    finally{}
}
run().catch(error => console.error(error))





app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`assignment11 server is running ${port}`)
})