const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
var app = express();

app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}, ${req.method}, ${req.url}`;
    
    fs.appendFile('Server.log',log ,(ERR)=>{
        if(ERR)
        console.log(ERR);
    });
    console.log(log);
    next();
});

// app.use((req,res,next)=>{
//     res.render('mantianance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear();
})


hbs.registerHelper('capital',(text)=>{
    return text.toUpperCase();
})

// app.get('/',(req,res)=>{
// // res.send('<h1>Hello Express</h1>');
// res.send(
//     {
//     name:'Hamza',
//     likes:[
//         'cricket',
//         'blue'
//     ]
// }
// );
// });

app.get('/about',(req,res)=>{
    //res.send('<h1>About Page</h1>');
    res.render('about.hbs',{
        pageTitle:'About Page3'
        
    });
})

app.get('/',(req,res)=>{
    //res.send('<h1>About Page</h1>');
    res.render('root.hbs',{
        welcomeMessage:'Welcome'
      
    });
})

app.listen(port,()=>{
    console.log(`Server running up... on ${port}`);
});