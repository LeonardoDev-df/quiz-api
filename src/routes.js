const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const Question = require('./models/Question') // includes our model
const User = require('./models/Users')
const Subject = require('./models/Subject');
const Users = require('./models/Users');
const Categorie= require('./models/Categorie');
const Titulo = require('./models/Titulos');

// get all quiz questions
router.get('/questions/list', async (req, res) => {
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get all quiz questions
router.get('/users', async (req, res) => {
    try {
        const user = await User.find()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get all Categorias
router.get('/categorie/list', async (req, res) => {
    try {
        const categorie = await Categorie.find()
        return res.status(200).json(categorie)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get all titulos dentro de Categorias
router.get('/listar', async (req, res) => {
    const titulo = Titulo
    await titulo.findAll({
        order: [['_id', 'DESC']],
        include: [{
            attributes: ['NomeCategoria'],
            model: Categorie
        }]
    })
    .then((titulos) => {
        return res.json({
            erro: false,
            titulos
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
           mensagem: "Erro: Nenhuma categoria encontrada!"
        });
    });
})

// get all Titulos
router.get('/titulo/list', async (req, res) => {
    try {
        const titulo = await Titulo.find()
        return res.status(200).json(titulo)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


// get one quiz question
router.get('/questions/:id/list', async (req, res) => {
    const id = req.params.id 
    try {
        const question = await Question.findById({ _id: id }).then((result) => {
          res.status(200).json({ Question: result });
        });
    
        if (!question) {
          res.status(422).json();
    
          return;
        }
      } catch (error) {
        res.status(500).json({ error: error });
      }
    
})

// create one quiz question
router.post('/questions/create', async (req, res) => {
    try {
        const newQuestion = await Question.create(req.body);
        

        res.status(201).json({
            newQuestion,
            result_code: "201",
            result_message: "success",
          });
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.put('/questions/update',  async (req, res) => {
    try {
      const { id } = await req.params;

      let question = await Question.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      success(res, question, "updatedQuestion");
    } catch (error) {
      badRequest(res, error);
    }
});

// update one quiz question
router.put('/questions/:id/update', async (req, res) => {
    try {
        const _id = req.params.id 
        const questios = [{
            question: String,
            options: [

            ],
            answer: String,
            tip: String
        }]
        const { category, titulo, questions = questios } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                category,
                titulo,
                questions
            })    
            return res.status(201).json(question)
        }else{
            // updates only the given fields
            if (category) {
                question.category = category
            }
            if (titulo) {
                question.titulo = titulo
            }
            if (questions) {
                question.questions = questions
            }
            
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create one Categoria
router.post('/categorie/create', async (req, res) => {
    try {
        const { 
            categorie,
            title,    
        } = req.body

        const categoria = await Categorie.create({
            categorie,
            title,   
        })

        return res.status(201).json(categoria)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create one Categoria
router.post('/titulo/create', async (req, res) => {
    try {
        const { titulo, questions } = req.body
       

        const title = await Titulo.create({
           titulo,
           questions
        })

        return res.status(201).json(title)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create one quiz apelido e pontos
router.post('/users', async (req, res) => {
    try {
        const { apelido } = req.body
        const { pontos } = req.body
        const { emblema } = req.body

        const user = await User.create({
            apelido,
            pontos,
            emblema    
        })

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/categorie/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const categoria = await Categorie.deleteOne({_id})

        if(categoria.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const user= await Users.deleteOne({_id})

        if(user.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

//creates a new subject
router.post('/subject', async (req, res) => {
    try {
        const {name} = req.body;
        const subject = await Subject.create({name})
        return res.status(200).json(subject)    
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// this one is just a test
router.get('/', (req, res) => {
    res.send('H3ll0 W0RlD')
})

//get all subjects
router.get('/subject', async (req, res) => {
    try {
        const subjects = await Subject.find()
        return res.status(200).json(subjects)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

//get all questions from a specific subject
router.get('/question/subject/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const questions = await Question.find({ subjects: _id });
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

module.exports = router