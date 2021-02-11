const userModel = require('../model/UserModel');

module.exports = {
  index: async function (req, res, next) {
    console.log('userController index::')
    var results = await userModel.getAll(req.con);

    if(results.status === 404) {
      res.status(results.status).send("<h1>ERROR 404!</h1>" + results.message)
      return;
    }
    console.log('uc::results:')
    
    // res.render("user/index", { data: results })
    res.json({status: 'success', results})
  },
  show: async function (req, res) {
    console.log('userController show::'+req.params.id)
    
    var results = await userModel.getOne(req.con, req.params.id);
    console.log('result show::', results)
    // res.render("user/index", { data: results })
    res.json({status: 'success', results})
  },

  store: async function (req, res) {
    console.log('userController store::')
    
    var data = ['node user', 'secode@mail.com', 'https://s3.ap-south-1.amazonaws.com/l2ltestimages/member_assets/photo/1613039579.jpg', '123456']
    if(req.body) {
      data = [];
      var obj = req.body;
      for(var i in obj) data.push(obj[i]); 
    }
   
    var results = await userModel.create(req.con, data);
    console.log('result store::', results)

    res.json({status: 'success', msg: 'user was added successfuly' , results})
    // res.redirect('/user');
  },


  update: async function (req, res) {
    console.log('userController update::', req.params.id)
   
    var results = await userModel.update(req.con, req.body, req.params.id);
    console.log('result update::', results)
    
    res.json({status: 'success', msg: 'user was updated successfuly' , results})
    // res.redirect('/user');
  },

  delete: async function (req, res) {
    console.log('userController delete::', req.params.id)
   
    var results = await userModel.delete(req.con, req.params.id);
    console.log('result delete::', results)
    
    res.json({status: 'success', msg: 'user was deleted successfuly' , results})
    // res.redirect('/user');
  }


}