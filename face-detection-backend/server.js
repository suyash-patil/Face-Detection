const Clarifai = require('clarifai');
const express =  require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();
app.use(bodyParser.json());

const app1 = new Clarifai.App({
    apiKey: 'YOUR_API_KEY'
});

app.use(cors());

app.get('/',(req,res)=> {
    res.json("Welcome to the Face Detection project");
})

app.post('/signin',(req,res)=> {
    db.select('email','hash').from('login')
    .where('email','=', req.body.email)
    .then(data => {
       const Isvalid =  bcrypt.compareSync(req.body.password, data[0].hash);
       if(Isvalid){
           return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        console.log(user[0]);
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json("Something Went Wrong"))
                    
       } else {
        res.status(400).json("Wrong Password");
       }
    }).catch(err => res.status(400).json("Something Went Wrong"))
})
app.post('/register',(req,res) => {
    const {username,email,password} = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        username: username,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
        })
    })
    .catch(err => res.status(400).json('Unable to Register. Make sure you have entered correct email address'));
            
})

app.get('/profile/:id',(req,res)=> {
    const {id} = req.params;
    db.select('*').from('users').where({id: id})
    .then(data => {
        if(data.length){
            res.json(data[0])
        } else {
            res.status(404).json("User Not Found")
        }
    })
})

app.put('/image',(req,res)=> {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {res.json(entries[0])})
    .catch(err => {
        res.status(400).json('Something went Wrong');
    })
})
app.post('/imageurl',(req,res)=> {
    app1.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.Input).then(data => {
        res.json(data)
    }).catch(err => res.json("wrong"))
})

app.listen(process.env.PORT || 3000,()=> {
    console.log("app is running on port ${process.env.PORT}");
})
