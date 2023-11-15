'use strict';

const express = require('express');
const morgan = require('morgan');

const {

} = require('./handlers')

express()
  .use(express.json())











  .listen(8000, () => {
    console.log(`Server listening on port ${8000}`)
  });

// build your server here

// consider making one or more handler files to ease the  division of work
