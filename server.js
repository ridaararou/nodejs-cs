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
  next()
})

// parsing body request
// app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

// Editor
app.use(express.static(path.join(__dirname, 'client/dist')))
app.get('/editor', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})


app.use('/user', routes);



app.listen(PORT, () => { console.log('server running at http://localhost:' + PORT )})


