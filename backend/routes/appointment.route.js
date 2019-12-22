let express = require('express'),
  mongoose = require('mongoose'),
  router = express.Router(),
  Appointment = require('../models/Appointment');
let User = require('../models/User');


router.get("/get-appointment", (req, res, next) => {
  try{
    Appointment.find().then(data => {
      res.status(200).json({
        message: "Appointment retrieved successfully!",
        users: data
      });
    });
  } catch(error){
    console.log(error);
    res.status(500).send(error);
   }
});

router.put("/update-appointment-status/:aptid/:currentStatus", (req, res, next) => {
  try{
    var aptid = mongoose.Types.ObjectId(req.params.aptid);
  // var query = {"_id": id};
    var update = {currentStatus: req.params.currentStatus};
    var options = {new: true};
    Appointment.findByIdAndUpdate(aptid, update, options).then(data => {
      res.status(200).json({
        message: "Appointment update successfully!",
        users: data
      });
    });
  }catch(error){
    console.log(error);
    res.status(500).send(error);
   }
});

router.get("/get-appointment-by-doctor/:doctorId", (req, res, next) => {
  try{
  Appointment
    .aggregate([
      {
        $match : {
          doctorId: mongoose.Types.ObjectId(req.params.doctorId),
          currentStatus: 'Pending'
        }
      },{
        $project: {
          bookingtime: {
            $concat: ["$dateOfAppointment","$timeOfAppointment"]
          },
          _id: 0,
        }
      }
    ])
    .exec(function(err, task){
      if (err) return res.send(err);
      res.status(200).json({message:'Profile found.',user:task});
   });
  }catch(error){
    console.log(error);
    res.status(500).send(error);
   }
});

router.get('/get-appointment-doctor/:doctor_id', (req, res)=>{
  try{
  Appointment
      .aggregate([
        {
          $lookup:
            {
              from: "users",
              localField: "doctorId",
              foreignField: "_id",
              as: "appointment_book"
            },         
      },
      
    ])
      .then((task) => res.send(task))
      .catch((error) => console.log(error));
    }catch(error){
      console.log(error);
      res.status(500).send(error);
     }
});

router.get('/get-appointment-for-doctor/:doctor_id', (req, res)=>{
 try{
  var doctor_id = mongoose.Types.ObjectId(req.params.doctor_id);
  
  Appointment
    .aggregate([
      { $match: { "doctorId": doctor_id } },
        {
          $lookup:
            {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "appointment_book"
            },        
      }
      
    ])
      .then((task) => res.send(task))
      .catch((error) => console.log(error));
    }catch(error){
      console.log(error);
      res.status(500).send(error);
     }
});



router.get('/get-appointment-for-doctor/:doctor_id/:today_date', (req, res)=>{
  try{
  var doctor_id = mongoose.Types.ObjectId(req.params.doctor_id);
  var today_date = req.params.today_date.replace('_','/');
  today_date = today_date.replace('_','/');
  console.log(today_date);
  Appointment
    .aggregate([
      { $match: { doctorId: doctor_id , dateOfAppointment: today_date} },
        {
          $lookup:
            {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "appointment_book"
            },        
      }
      
    ])
      .then((task) => res.send(task))
      .catch((error) => console.log(error));
    }catch(error){
      console.log(error);
      res.status(500).send(error);
     }
});


router.get('/get-appointment/:user_id', (req, res)=>{
  try{
  var userId = mongoose.Types.ObjectId(req.params.user_id);
  
  Appointment
    .aggregate([
      { $match: { "userId": userId } },
        {
          $lookup:
            {
              from: "users",
              localField: "doctorId",
              foreignField: "_id",
              as: "appointment_book"
            },        
      }
      
    ])
      .then((task) => res.send(task))
      .catch((error) => console.log(error));
    }catch(error){
      console.log(error);
      res.status(500).send(error);
     }
});


router.get("/get-appointment/:user_id/data", (req, res, next) => {
    try{
    Appointment.findById(req.params.user_id)
   .populate({
     path: 'users',
     select: 'patient-appointment',
   })
   .exec(function(err, user){
      if (err) return res.send(err);
      res.status(200).json({'message':'Profile found.','user':user});
   });
  }catch(error){
    console.log(error);
    res.status(500).send(error);
   }

  });

  
  

  router.post('/add-appointment', (req, res, next) => {
    try{
    const appointment = new Appointment({
      _id: new mongoose.Types.ObjectId(),
      userId: req.body.userId,
      doctorId: req.body.doctorId,
      dateOfAppointment: req.body.dateOfAppointment,
      timeOfAppointment: req.body.timeOfAppointment,
      currentStatus: req.body.currentStatus,
      remarks: req.body.remarks
    });
    appointment.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Appointment booking successfully!",
        userCreated: {
          _id: result._id,
          userId: result.userId,
          doctorId: result.doctorId,
          dateOfAppointment: result.dateOfAppointment,
          timeOfAppointment: result.timeOfAppointment,
          currentStatus: result.currentStatus,
          remarks: result.remarks,
         
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


  module.exports = router;