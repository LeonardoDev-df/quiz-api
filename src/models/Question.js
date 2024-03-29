const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    dados: [
        {
            category: String,            
            titulo: String,
            questions: [
                {    
                    question: {
                        type: String,
                    },
                    options:[ {
                        type: String,           
                    }
                    ],
                    answer: {
                        type: String,
                    },
                    tip: {
                        type: String,
                    },
                }
            ]
        }
    ]
})

module.exports = mongoose.model('Question', QuestionSchema)