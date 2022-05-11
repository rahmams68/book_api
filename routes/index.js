var express = require('express');
var router = express.Router();
const BookController = require("../controller/BookController")
const UserController = require("../controller/UserController")
const verifyToken = require("../middleware/verifytoken")

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

//create endpoint
router.get('/book/', BookController.getBook);
router.post('/book/add', BookController.addBook)
router.put('/book/:id', BookController.updateBook)
router.delete('/book/:id', BookController.deleteBook)

router.get('/user/', verifyToken.auth, UserController.getUser)
router.post('/user/register', verifyToken.authSuper, UserController.register)
router.post('/user/login', UserController.login)


module.exports = router;
