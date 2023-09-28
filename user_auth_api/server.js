import  express, { response } from 'express';
import jwt from 'jsonwebtoken';

const app =express();


const secretKey ="secretKey";


app.get('/', (req, res)=>{
    res.json({
        message: " a sample api"
    })
});

app.post('/login',(req,res)=>{
     const user={
        id:1,
        username: 'akash',
        email: 'akash@test.com'
     }

     jwt.sign({user},secretKey, { expiresIn: '3000s'},(err,token)=>{
       if(err){
            return res.status(500).send({message:"Token not generated"});
       }else{
        res.json({
            token
        })
       }
     })
});

app.post('/profile', verifyToken,(req, res)=>{
    res.json({
        message: 'Profile route accessed successfully'
    });
});

function verifyToken(req, res, next){
const bearerHeader = req.headers['authorization'];
if(typeof bearerHeader !== 'undefined'){
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, secretKey, (err, auth)=>{
        if(err){
            res.status(403).send({message: "Token not found"})
        }else{
            req.auth =auth;
            next();
        }
    })
}else{
    res.status(401).send({
        result:'Token Unauthorised'
    })
}
}

app.listen(5000,()=>{
    console.log(`Server is running 5000`);
})