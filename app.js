const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api' , (req, res) => {
    res.json({ // have not connected to database
        //normal string ka liye send
        message: 'Welcome to the API'
    });
});

app.post('/api/posts' , (req, res) => {
    // console.log(req.Header)
    jwt.verify(req.headers.authorization, 'secretkey', (err, authData) =>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({ // have not connected to database
                message: 'POST Created Welcome to the API',
                authData
                // when we run in postman we get 'iat' which is issues at (or can also pass timestamp)
                //if using expireIn and we run in postman we get 'exp' which means token will expire in given time
            });
        }
    });
});

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>
//in above line [Bearer <access_token>] is seperated by space so we can see that Bearer is at index[0] and <access_token> is at index[1]

// Verify Token
// next to check whole body and then call next
// function verifyToken(req, res, next) {
//     // Get auth header value, when we send we send it in header as authrorization value
//     const bearerHeader = req.headers['authorization'];
//     //Check if bearer is defined
//     if (typeof bearerHeader !== 'undefined'){
//         //to get bearer we will Split at the space
//         const bearer = bearerHeader.split(' '); // slit string into array with space
//         //Get token from array read on line 20
//         const bearerToken = bearer[1];
//         //Set the token
//         req.token = bearerToken;
//         //Next middleware
//         next();
//     }else{
//         //Forbidden error as we can not access without token
//         res.sendStatus(403);
//     }
// }

//generating token
app.post('/api/login' , (req, res) => {
    //Mock User
    const user = {
        id: 101,
        username: 'Darpan',
        email: 'darpan@gmail.com'
    }
    //user is payload (body) mock user
    //expireIn will expire Token in given time
    jwt.sign({user: user}, 'secretkey',{ expiresIn: '30s' }, (err, token) => {
        res.json({
            token: token 
        });
    });
    // jwt.sign({user}, 'secretkey', (err, token) => {
    //     res.json({
    //         token 
    //     });
    // });
});

app.listen(5000, () => console.log('Server started on port 5000'))
