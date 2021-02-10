const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost', 
  user:'root', 
  password: '',
  connectionLimit: 5,
  database: 'image-editor',
});

var usersModel;
usersModel.getUsers = async function () {
  let conn;
  try {
    var users = [];
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * from users");
    rows.filter((el) => { users.push(el)});
    console.log('getUsers', users);
    return users;
  } catch (err) {
    return {message: 'Something went wrong! '+ err};
  } finally {
	  if (conn) return conn.end();
  }
}

usersModel.setUser = async function (data) {
  let conn;
  try {
    // data = [1, "mariadb"]
    const res = await conn.query("INSERT INTO users value (?, ?)", data);
    console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

    return res;
    // conn.query(
    //   "INSERT INTO someTable VALUES (?, ?, ?)", 
    //   [1,Buffer.from("c327a97374", "hex"),"mariadb"]
    //  )
    //  .then(...)
    //  .catch(...);
  } catch (err) {
    return {message: 'Something went wrong! '+ err};
  } finally {
	if (conn) return conn.end();
  }
}

module.exports = usersModel;

