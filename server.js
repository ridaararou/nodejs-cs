const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

// Editor
app.use(express.static(path.join(__dirname, 'client/dist')))
app.get('/editor', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})

// db
const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost', 
  user:'root', 
  password: '',
  connectionLimit: 5,
  database: 'image-editor',
});

var asyncFunction2 = new Promise(async function(myResolve, myReject) {
  // "Producing Code" (May take some time)
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * from users");
    var users = [];
    rows.filter((el, index) => { users.push(el)});
    // console.log(users); //[ {val: 1}, meta: ... ]
    // const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    myResolve(users);
  } catch (err) {
    myReject(err);
	  throw err;
  } finally {
	  if (conn) return conn.end();
  }
});

async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * from users");
    var users = [];
    rows.filter((el, index) => { users.push(el)});
    // console.log(users); //[ {val: 1}, meta: ... ]
    // const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    return users;
  } catch (err) {
    return users;
	  throw err;
  } finally {
	  if (conn) return conn.end();
  }
}

app.get('/db', (req, res) => {
  asyncFunction2.then((v) => {
    console.log('users::', v)
    res.send(users)
  });
  // conn = await pool.getConnection();
  // const rows = await conn.query("SELECT * from users");
  // var users = [];
  // rows.filter((el, index) => { users.push(el)});

})






app.listen(PORT, () => { console.log('server running at http://localhost:' + PORT )})


