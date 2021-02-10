const userModel = require('../model/UserModel');

module.exports = {
  index: async function (req, res) {
    console.log('userController index::')
    var rows = await userModel.getAll(req.con);
    console.log('uc::results:')
    // res.json(rows)
    // res.render('user/index', rows)
    res.render("user/index", { data: rows })
  },
  show: async function (req, res) {
    console.log('userController show::', req.params.id)
    
    // var rows = await userModel.getOne(req.con, req.params.id);
    // console.log(rows)
    // res.render("user/index", { data: rows })
  }
}