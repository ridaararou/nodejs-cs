// USER Model
var tableName = 'users';

module.exports = {
  getAll: async function(con, callback) {
    // con.query(`SELECT * FROM ${tableName}`, callback)
    console.log('user MODEL:');
    try {
      var conn = await con.getConnection();
      const rows = await conn.query(`SELECT * from ${tableName}`);
      return rows;
    } catch (err) {
      console.log('Error in userModel getAll::', err)
      return {status: 404, message: err};
    } finally {
      if (conn) conn.release(); //release to pool
    }
      
  },

  getOne: async function(con, id, callback) {
    // con.query(`SELECT * FROM ${tableName} WHERE id = ${id}`, callback)
    id = parseInt(id);
    if(typeof(id) !== 'number' && !isFinite(id) && Math.round(id) !== id)
      return {message: "ID should be a number"}
    try {
      var conn = await con.getConnection();
      const row = await conn.query(`SELECT * FROM ${tableName} WHERE id = ${id}`);
      return row;
    } catch (err) {
      console.log('Error in userModel::', err)
      throw err;
    } finally {
      if (conn) conn.release(); //release to pool
    }
  },

  create: async function(con, data, callback) {
    try {
      var conn = await con.getConnection();
      const results = await conn.query("INSERT INTO users (name, email, profile_pic, password) values (?, ?, ?, ?)", data);
      // console.log('model results:: create', results); 
      // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      return results;
    } catch (err) {
      console.log('Error in userModel create::', err)
      throw err;
    } finally {
      if (conn) conn.release(); //release to pool
    }

  },

  update: async function(con, id) {
    
    try {
      var conn = await con.getConnection();
      const results = await conn.query(`UPDATE ${tableName} SET name = '${data.name}', email = '${data.email}' , password = '${data.pass}', profile_pic = '${data.img}' WHERE id = ${id}`);
      // console.log('model results:: update', results); 
      // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      return results;
    } catch (err) {
      console.log('Error in userModel update::', err)
      throw err;
    } finally {
      if (conn) conn.release(); //release to pool
    }
  },

  destroy: async function(con, id) {
    // con.query(`DELETE FROM ${tableName} WHERE id_${tableName} = ${id}`, callback)

    try {
      var conn = await con.getConnection();
      const results = await conn.query(`DELETE FROM ${tableName} WHERE id = ${id}`);
      console.log('model results:: delete', results); 
      // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      return results;
    } catch (err) {
      console.log('Error in userModel delete::', err)
      throw err;
    } finally {
      if (conn) conn.release(); //release to pool
    }

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
