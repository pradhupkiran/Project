const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./MODELS/Usermodels')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')


const app = express()
app.use(express.json())
app.use(cors({
    origin : ["http://localhost:3000"],
    methods : ["GET","POST"],
    credentials:true
}
))
app.use(cookieParser())

mongoose.connect('mongodb://127.0.0.1:27017/CRUD')


app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    UserModel.findOne({email:email})
        .then(user=>{
            if(user){
                bcrypt.compare(password,user.password,(result,err)=>{
                    if(result){
                        const token = jwt.sign({email:user.email, role:user.role},"secret-key",{expiresIn:"1d"})
                        res.cookie("token",token)
                        return res.json({Status:"login success",role:user.role})
                    }
                    else{
                        res.json("invalid password")
                    }
                })

            }
            else{
                res.json("invalid user")

            }
        })
})

app.post('/',(req,res)=>{
    const {name,email,password} = req.body;
    bcrypt.hash(password,10)
    .then(hash=>{
        UserModel.create({name,email,password:hash})
            .then(result=>res.json(result))
            .catch(err=>res.json(err))
    })
    .catch(err=>res.json(err))

})

const verifyuser = (req,res,next)=>{
    const token = req.cookies.token;
    // console.log(token);
    if(!token){
        return res.json("token is not available")
    }
    else{
        jwt.verify(token,"secret-key",(err,decoded)=>{
            if(err){
                return res.json("wrong token")
            }
            else{
                if(decoded.role === 'admin'){
                    next()
                }
                else{
                    return res.json ("not admin")
                }
            }
            
        })
    }
}
app.get('/admin',verifyuser,(req,res)=>{
    return res.json("log succ as admin")
})


app.get('/home',verifyuser,(req,res)=>{
    res.json('homepage okkk')
})

app.get('/getalluserdata',(req,res)=>{
    UserModel.find()
        .then(result=> res.json(result) )
        .catch(err => res.json(err))
})



app.listen(3001,()=>{
    console.log('running');
})