const express = require('express');
const fs = require('fs');
const path = require('path');
const api =require('./routes/index.js');
const data = require('./db/db.json');
const uuidv4 = require('./helpers/uuid.js');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils.js');
const PORT = process.env.port || 3002;

const app = express();

// what will this app be using 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public/'));

app.use('/api',api);




// get homepage
app.get('/',(req,res)=> 
    
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api',(req,res)=>res.json(data));
// get route for notes
app.get('/pages/notes',(req,res)=> {
//     res.json(data);
//   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));   
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
});


app.get('/api/notes',(req,res)=> {
    res.json(data);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));   
    // res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
});

app.post('/api/notes', (req, res) => {

    // Destructuring assignment for the items in req.body
    const {id,title,text} = req.body;

    // If all the required properties are present
    if (id, title && text) {
      // Variable for the object we will save
      const newNotes = {
         id: uuidv4(),
        title,
        text,};
       
        
      fs.readFile('./db/db.json','utf-8',(err,data)=> {
       
        if (err){
            console.error(err);
        } 
        else {
            const parsedNote =JSON.parse(data);

            parsedNote.push(newNotes);

        fs.writeFile('./db/db.json',JSON.stringify(parsedNote,null,4),
            (writeErr)=>
            writeErr
            ? console.error(writeErr)
            : console.info('succesful'));
            
        }
      });
      
      
      const response = {
        status: 'success',
        body: newNotes,
      };
      res.json(`no errors ${response}`);
    } else {
      res.json(`Error in creating note`);
    }
    // return res.json(data);
  });
  


   

app.listen(PORT, () =>
    console.log(`App at http://localhost:${PORT}`)
);