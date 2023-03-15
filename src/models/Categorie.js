const mongoose = require('mongoose')

const CategorieSchema = new mongoose.Schema({
    categorie: {
        type: String,   
    },
    title: {
        type: String,   
    }
})



module.exports = mongoose.model('Categorie', CategorieSchema)