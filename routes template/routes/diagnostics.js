const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
 readFromFile('./db/diagnostics.js').then((data)=>res.json(JSON.parse(data)))
  // TODO: Logic for sending all the content of db/diagnostics.json
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const {time, error_id,errors,tip,topic,username}= req.body;
  
  if (time && error_id && errors && tip && topic && username) {
    const
  }
});

module.exports = diagnostics;
