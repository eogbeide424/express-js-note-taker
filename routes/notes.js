const notes = require('express').Router();
const { v4: uuidv4 } = require('../helpers/uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const data = require('../db/db.json');

// GET Route for retrieving all the notes
notes.get('api/pages/notes', (req, res) => {
  res.json(data);
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for submitting feedback
notes.post('api/pages/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const {id, title, text  } = req.body;

  // If all the required properties are present
  if (id && title && text) {
    // Variable for the object we will save
    const newNotes = {
      id :uuidv4(),
      title,
      text
    };

    readAndAppend(newNotes, './db/db.json');

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = notes;
