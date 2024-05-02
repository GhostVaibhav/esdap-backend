const { MongoClient } = require("mongodb");


const uri = "mongodb+srv://admin:g2QMVBNFdsXQpuLy@admindb.ffrvx5l.mongodb.net/?retryWrites=true&w=majority&appName=AdminDB";
const client = new MongoClient(uri);

async function getLoginDetails(req) {
    const database = client.db("admin_db");
    const collection = database.collection("credentials");
    const data = req.body.credentials;
    const count = await collection.countDocuments({ token: data });
    const response = count != 0;
    return response
}

async function getStudentData() {
    const database = client.db("student_details");
    const collection = database.collection("details");
    const data = await collection.find({}).toArray();
    console.log(data)
    return data;
}

async function collectData(obj, result) {
    const database = client.db("student_details");
    const collection = database.collection("details");
    const data = obj;
    data.result = result;
    await collection.insertOne(data);
}

module.exports.getLoginDetails = getLoginDetails
module.exports.getStudentData = getStudentData
module.exports.collectData = collectData
