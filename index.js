const express = require('express');
const logger = require('./middleware/logger');
const app = express();


// Initializing middleware
// app.use(logger);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Users API
app.use('/api/users', require('./routes/api/users'));


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}...`)})
