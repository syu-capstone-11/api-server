const express = require('express');
const logger = require('morgan');

const app = express;
app.listen(3000, () => {console.log('Running on port 3000');});
app.request(morgan('combined'));
