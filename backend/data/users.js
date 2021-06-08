const  bcryptjs =require('bcryptjs');

const users=[
    {
        name:'mohamed',
        email:'mohamed@gmail.com',
        password:bcryptjs.hashSync('abc123',10),
        isAdmin:true
    },
    {
        name:'ahmed',
        email:'ahmed@gmail.com',
        password:bcryptjs.hashSync('abc123',10),
        
    },
    {
        name:'khalid',
        email:'khalid@gmail.com',
        password:bcryptjs.hashSync('abc123',10),
        
    },
    {
        name:'jaber',
        email:'jaber@gmail.com',
        password:bcryptjs.hashSync('abc123',10),
        
    }
]


module.exports =  users;