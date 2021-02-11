const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const methodOverride = require("method-override")

const PORT = process.env.PORT || 4000;
const conn = require("./config/db.js");
const routes = require("./routes/UserRoutes");


// Using pug template engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// connecting route to database
app.use(async function(req, res, next) {
  req.con = conn; //await conn.getConnection();
  req.username = 'Rida'
  next()
})

// parsing body request
// app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
// app.use(auth)
// handel erroes
app.use(logErrors)
app.use(errorHandler)

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

// Image Editor
app.use(express.static(path.join(__dirname, 'client/dist')))
app.get('/editor', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})

// User Routes
app.use('/user', routes);

// middleware fucntions
//-- auth
function auth (req, res, next) {
  console.log('logger', process.env.DB_NAME)
  if(req.username == 'Rida') {
    console.log('Authenticated Success')
    next()
  }
  else {
    console.log('Not Authenticated')
    res.status(401).send('Not Authenticated')
  }
}
//  errors
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
function errorHandler(err, req, res, next) {
  console.log('errorHander')
  res.status(500)
  res.render('error', { error: err })
}


// open server
app.listen(PORT, () => { console.log('server running at http://localhost:' + PORT )})


