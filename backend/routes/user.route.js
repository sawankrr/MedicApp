let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();

// Multer File upload settings
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


// User model
let User = require('../models/User');
var bcrypt = require('bcryptjs');

router.post('/login-user', async (req, res, next) =>{
  try{
    // console.log(req.body.email+" "+req.body.password);
    var user = await User.findOne({email: req.body.email}).exec();
    console.log(user);
    if(!user) {
      console.log("not user");
      return res.status(400).send({ message: "The username does not exist" });
  }
  if(!bcrypt.compareSync(req.body.password, user.password)) {
    console.log("invalid user");
      return res.status(400).send({ message: "The password is invalid" });
  }
  res.send(user);
  }
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
// POST User
router.post('/create-user', upload.single('avatar'), (req, res, next) => {
  try{
  const url = req.protocol + '://' + req.get('host')
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    avatar: url + '/public/' + req.file.filename,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    password: req.body.password,
    problem: req.body.problem,
    usertype: req.body.usertype
  });
  user.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "User registered successfully!",
      userCreated: {
        _id: result._id,
        name: result.name,
        avatar: result.avatar,
        email: result.email,
        phone: result.phone,
        city: result.city,
        password: result.password,
        problem: result.problem,
        usertype: result.usertype
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
}catch(error){
  console.log(error);
  res.status(500).send(error);
 }
}); 

// GET All Users
router.get("/", async (req, res, next) => {
  try{
    await User.find().then(data => {
      res.status(200).json({
        message: "Users retrieved successfully!",
        users: data
      });
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


router.get("/find-doctors", async (req, res, next) => {
  try{
    await User.find({usertype: 1}).then(data => {
      res.status(200).json({
        message: "Users retrieved successfully!",
        users: data
      });
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


router.get('/get-speciality', async (req, res)=>{
 try{
  await User.distinct('problem', {usertype: 1})
  .then((list) => res.send(list))
  .catch((error) => console.log(error));
 }
 catch(error){
  console.log(error);
  res.status(500).send(error);
 }
});

router.get("/:doctorId", async (req, res, next) => {
  try{
    await User.findOne({'_id': req.params.doctorId}).then(data => {
      res.status(200).json({
        message: "Doctor retrieved successfully!",
        users: data
      });
    });
  }
  catch(error){
    console.log(error);
    res.status(500).send(error);
   }
});


router.get('/search-doctor', async (req, res)=>{
  try{
    await User.find({'usertype': 1})
        .then((list) => res.status(200).send(list))
        .catch((error) => console.log(error));
  }
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/search-patient', (req, res)=>{
  try{
  User.find({usertype: 2})
      .then((list) => res.send(list))
      .catch((error) => console.log(error));
    }catch(error){
      console.log(error);
      res.status(500).send(error);
     }
});


router.get('/get-specialistion', (req, res)=>{
  try{
  User.distinct('problem', {usertype: 1})
  .then((list) => res.send(list))
  .catch((error) => console.log(error));
}catch(error){
  console.log(error);
  res.status(500).send(error);
 }
});





module.exports = router;