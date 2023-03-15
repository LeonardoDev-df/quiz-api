const mongoose = require('mongoose')


const TituloSchema = new mongoose.Schema({
    titulo:{
        type: String,   
    },
    questions:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'Questions'}
    ],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: false
    }]
})



module.exports = mongoose.model('Titulo', TituloSchema)