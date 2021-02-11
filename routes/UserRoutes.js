const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.store);
router.put('/:id', userController.update);

module.exports = router;



// const express = require("express")
// const router = express.Router
// const biodataController = require("../controller/biodataController")

// router.get("/", biodataController.index)
// router.get("/create", biodataController.create)
// router.post("/", biodataController.store)
// router.get("/:id/edit", biodataController.edit)
// router.put("/:id", biodataController.update)
// router.delete("/:id", biodataController.destroy)
// module.exports = router;