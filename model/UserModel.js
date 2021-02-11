// USER Model
var dbName = 'image-editor';

module.exports = {
  getAll: async function(con, callback) {
    // con.query(`SELECT * FROM ${dbName}`, callback)
    console.log('user MODEL:');
    try {
      var conn = await con.getConnection();
      const rows = await conn.query("SELECT * from users");
      return rows;
    } catch (err) {
      console.log('Error in userModel getAll::', err)
      return {status: 404, message: err};
    } finally {
      if (conn) conn.release(); //release to pool
    }
      
  },

  getOne: async function(con, id, callback) {
    // con.query(`SELECT * FROM ${dbName} WHERE id = ${id}`, callback)
    id = parseInt(id);
    if(typeof(id) !== 'number' && !isFinite(id) && Math.round(id) !== id)
      return {message: "ID should be a number"}
    try {
      var conn = await con.getConnection();
      const row = await conn.query(`SELECT * FROM ${dbName} WHERE id = ${id}`);
      return row;
    } catch (err) {
      console.log('Error in userModel::', err)
      throw err;
    } finally {
      if (conn) conn.release(); //release to pool
    }
  },

  create: function(con, data, callback) {
    con.query(
      `INSERT INTO ${dbName} SET 
      nama = '${data.nama}', 
      alamat = '${data.alamat}'`,
      callback
    )
  },

  update: function(con, data, id, callback) {
    con.query(
      `UPDATE ${dbName} SET 
      nama = '${data.nama}', 
      alamat = '${data.alamat}' 
      WHERE id_${dbName} = ${id}`,
      callback
    )
  },

  destroy: function(con, id, callback) {
    con.query(`DELETE FROM ${dbName} WHERE id_${dbName} = ${id}`, callback)
  }
}



// var usersModel;
// usersModel.getUsers = async function () {
//   let con;
//   try {
//     var users = [];
//     con = await pool.getconection();
//     const rows = await con.query("SELECT * from users");
//     rows.filter((el) => { users.push(el)});
//     console.log('getUsers', users);
//     return users;
//   } catch (err) {
//     return {message: 'Something went wrong! '+ err};
//   } finally {
// 	  if (con) return conn.end();
//   }
// }

// usersModel.setUser = async function (data) {
//   let conn;
//   try {
//     // data = [1, "mariadb"]
//     const res = await conn.query("INSERT INTO users value (?, ?)", data);
//     console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

//     return res;
//     // conn.query(
//     //   "INSERT INTO someTable VALUES (?, ?, ?)", 
//     //   [1,Buffer.from("c327a97374", "hex"),"mariadb"]
//     //  )
//     //  .then(...)
//     //  .catch(...);
//   } catch (err) {
//     return {message: 'Something went wrong! '+ err};
//   } finally {
// 	if (conn) return conn.end();
//   }
// }
