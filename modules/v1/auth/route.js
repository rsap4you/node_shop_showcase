const con = require('../../../config/database')
const express = require('express');
const router = express.Router();
const middleware = require('../../../middleware/validator');
const Auth = require('./modal');
const { request } = require('express');
var multer = require('multer');
var path = require('path');
const { error } = require('console');
const { required } = require('../../../language/en');


var storage1 = multer.diskStorage({
    destination:function(request,file,callback){
      callback(null,'public/user')
    },
    filename:function(request,file,callback){
      callback(null,Date.now()+ path.extname(file.originalname));
  
    }
  });
  
  var upload = multer({
    storage:storage1,
    limits:{
      filesize: (12 * 1024 * 1024)
    }
  }).single('profile_image');
  
  
  
  router.post("/uploadprofile",function(request,res){
    upload(request,res,function(error){
      if(error){
         middleware.sendResponse(request,res,'0',{keyword:"something went wrong ! failed to upload",content:{}},null);
      }
     else{
      middleware.sendResponse(request,res,'1',{keyword:"upload success",content:{}},{image:request.file.filename});
     } 
  
    })
  });


// mutiple pic upload
var storage = multer.diskStorage({
    destination:function(request,file,callback){
      callback(null,'public/place')
    },
    filename:function(request,file,callback){
      callback(null,Date.now()+ path.extname(file.originalname));
  
    }
  });
  

  
  var placeimage = multer({
    storage:storage,
    limits:{
      filesize: (12 * 1024 * 1024)
    }
  }).array('image',3)




  router.post("/uploadproduct",function(request,res){
    // middleware.decryption(req.body,(request)=>{
    placeimage(request,res,function(error,result,message){
        // console.log("error",error);
      if(error){
        console.log(error)
        middleware.sendResponse(request,res,'0',{keyword :"rest_keywords_upload_img_error",content:{}},null);
      }
     else{
        // console.log(result)
       middleware.sendResponse(request,res,'1',{keyword :"rest_keyword_user_add",content:{}},result);
     } 
  
    })

  });
  
// **** end  multer code *******
router.post('/signup', (req, res) => {

    var request = req.body;
    //  middleware.decryption(req.body,(request)=>{
    var rules = {

       
        profile: '',
        name: 'required',
        code:'required',
        mobile:'required',
        email: ['required', 'email'],
        email_verify:'required',
        password: 'required_if:login_type,S',
        role:'required|in:user,vendor',
        login_type : 'required|in:S,F,G',
        device_type: 'required|in:A,I,W',   
        device_token: 'required',
    }

  

    var message = {
        required: req.language.required,
        email: req.language.email
    }

    if (middleware.checkValidation(res, request, rules, message)) {
        Auth.signup(request, (code, message, data) => {
            middleware.sendResponse(req, res, code, message, data)
        })
    }

    //  })
 })



router.post('/verify-otp',(req,res)=>{

    var request = req.body;

    var rules = {
        user_id:'required',
        otp_code:'required'
    }

    var message = {
        required: ':attr fild is requiered'
    }

    if (middleware.checkValidation(res,request,rules,message)) {
        Auth.verification(request,(code,message,data) => {
            middleware.sendResponse(req, res, code, message ,data)
        })
    } 

})

router.post('/sendotp',(req,res)=>{
    var request = req.body;

    var rules = {
        user_id:'required'
    }

    var message = {
        required: ':attr fild is requiered'
    }

    if (middleware.checkValidation(res,request,rules,message)) {
        Auth.sendotp(request,(code,message,data) => {
            middleware.sendResponse(req, res, code, message ,data)
        })
    } 
})

router.post('/mobileotp',(req,res)=>{
  var request = req.body;

  var rules = {
      mobile:'required|numeric'
  }

  var message = {
      required: ':attr fild is requiered'
  }

  if (middleware.checkValidation(res,request,rules,message)) {
      Auth.ValidateUser(request,(code,message,data) => {
          middleware.sendResponse(req, res, code, message ,data)
      })
  } 
})

router.post('/login', (req, res) => {

    // middleware.decryption(req.body,(request)=>{

    var request = req.body;

    var rules = {
        login_type : 'required|in:S,F,G',
        email: 'required_if:login_type,S',
        password: 'required_if:login_type,S',
        social_id : 'required_if:login_type,F,G',
        device_type: 'required',
        // device_token: 'required'
    }

    var message = {
        required: req.language.required,
        email: req.language.email
    }

    if (middleware.checkValidation(res, request, rules, message)) {
        Auth.login(request, (code, message, data) => {
            middleware.sendResponse(req, res, code, message, data)
        })
    }
  //  })

})

router.post('/logout', (req, res) => {
    var request = req.body;
    // middleware.decryption(req.body,(request)=>{
 

    var message = {
        required: req.language.required,
    }


    if (middleware.checkValidation(res, request, message)) {
        Auth.logout(req, (code, message, data) => {
            middleware.sendResponse(req, res, code, message, data)
        })
    }
    // })
})

router.post('/forgotpassword', (req, res) => {
  // middleware.decryption(req.body,(request)=>{
  var request = req.body;

  var rules = {
      login_type : "required",
      email: 'required_if:login_type,S',
  }

  var massage = {
      required: req.language.required,
      email: req.language.email
  }

  if (middleware.checkValidation(res, request, rules, massage)) {
      Auth.forgotpassword(request, (code, massage, data) => {
          middleware.sendResponse(req, res, code, massage, data);
      });
  }
  // })
})


router.get('/forgot/:id', (req, res) => {
  var id = req.params.id;
  con.query(`SELECT * FROM tbl_user WHERE id = ?`, [id], (error, result) => {
      var currtime = new Date();
      var timediff = currtime.getMinutes() - result[0].forget_time.getMinutes();
    //   console.log("timediff:", forget_time);
      if (!error && result.length > 0) {
          var data = result[0];
          var is_forget = data.is_forget;
          if (is_forget == 1 && timediff < 2) {
              res.render('forgot.html', { id: req.params.id })
          } else {
              con.query(`UPDATE tbl_user SET is_forget = '0' `, (error, result) => {
                  res.send("Invalid link because this link being used")
              })
          }
      } else {
          res.send("Invalid link")

      }
  })


})
router.post('/forgoted/:id', (req, res) => {
    var request = req.body;
    // middleware.decryption(req.body,(request)=>{
    var id = req.params.id
    Auth.getuserdetails(id, (userdata) => {
        if (userdata == null) {
            middleware.sendResponse(req, res, code, massage, data);
        } else {
            if (userdata.is_forget == 1) {
                Auth.resetpassword(request, id, (code, massage, data) => {
                    con.query(`UPDATE tbl_user SET is_forget = '0'`, (error, result) => {
                      // console.log("error to upadte",error);
                    //   swal("Good job!", "You clicked the button!", "success");
                        res.render("result.html", { data: data })
                    })
                });
            } else {
              // console.log("error in resut.htnl:",error);
                res.send("Invalid!!")
            }
        }

    })
    // }) 

})



router.patch('/changepswd', (req, res) => {

    // middleware.decryption(req.body, (request) => {
        var request = req.body;
        var user_id = req.user_id;

        var rules = {
            old_password : "required",
            new_password: 'required',
        }
    
        var massage = {
            required: req.language.required,
           
        }
    
        if (middleware.checkValidation(res, request, rules, massage)) {
            Auth.changepassword(request, user_id, (code, massage, data) => {
                middleware.sendResponse(req, res, code, massage, data);
            });
        }
       
    // });

});



module.exports = router;