const { MongoClient, ObjectId} = require('mongodb');
const { config } = require('../config');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {

    constructor(){
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName= DB_NAME;
    }

    connect(){
        if (!MongoLib.connection){
            MongoLib.connection = new Promise((resolve, reject)=>{
                this.client.connect(err =>{
                    if(err) {
                        reject(err);
                    }
                    resolve(this.client.db(this.dbName));
                });
            });
        }
        return MongoLib.connection;
    }

    create(collection, data){
        return this.connect().then(db=>{
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }

    get(collection, id){
        return this.connect().then(db=>{
            const result = db.collection(collection).findOne({_id:ObjectId(id)});
            console.log('result:', result);
            return result; 
        });
    }

    getRegistroUsername(collection, username){
        return this.connect().then(db=>{
            const result = db.collection(collection).findOne({username:username});
            return result; 
        });
    }

    updateLuhn(collection, id,data){
        return this.connect().then(db=>{
            return db.collection(collection).updateOne({_id:ObjectId(id)},{$set:{"number": data }},{upsert: true});
        }).then(result => result.upsertedId || id);
    }

    updateCompras(collection, id,data){
        return this.connect().then(db=>{
            return db.collection(collection).updateOne({_id:ObjectId(id)},{$set:{"nombre": data.nombre, "precio": data.precio, "cantidad": data.cantidad, "peso": data.peso}},{upsert: true});
        }).then(result => result.upsertedId || id);
    }

    updateIsActive(collection, username) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ username: username } , { $set: {"isActive": true }  }, { upsert: true });
        }).then(result => result.upsertedId || username);
    }

    delete(collection, id){
        return this.connect().then(db=>{
            return db.collection(collection).deleteOne({_id:ObjectId(id)});
        }).then(()=>id);
    }

    

   

}

module.exports = MongoLib;