const ObjectId = require('mongodb').ObjectId;
const getDb = require("../mongodb");
let db = null;

class Publicaciones {

    collection = null;
    constructor() {
        getDb()
            .then((database) => {
                db = database;
                this.collection = db.collection('Publicaciones')
                if (process.env.MIGRATE === "true") {
                    //Por si se ocupa algo
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    async new(id_usuario, contenido, fecha, destacada, likes) {
        const newPublicacion = {
            id_usuario,
            contenido,
            fecha,
            destacada,
            likes
        };
        return await this.collection.insertOne(newPublicacion);
    }

    async getAll() {
        const cursor = this.collection.find({});
        return await cursor.toArray();
    }

    async getById(id) {
        const _id = new ObjectId(id);
        const filter = { _id };
        return await this.collection.findOne(filter);
    }

    async updateOne(id, destacada) {
        const filter = { _id: new ObjectId(id) };
        const updateCmd = {
            '$set': {
                destacada,
            }
        };
        return await this.collection.updateOne(filter, updateCmd);
    }

    async deleteOne(id) {
        const _id = new ObjectId(id);
        const filter = { _id };
        return await this.collection.deleteOne(filter);

    }
}

module.exports = Publicaciones;