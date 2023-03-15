const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    apelido: String,
    pontos: Number,
    emblema: String,
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: false
    }]
})



module.exports = mongoose.model('Users', UserSchema)