const con = require("../../../config/database");
const comman = require("../../../config/common");
const common = require("../../../config/common");
var asyncLoop = require("node-async-loop");
const GLOBALS = require("../../../config/constant");

const emailtemplate = require("../../../config/template");
const { request } = require("express");
const cryptLib = require("cryptlib");
const bcrypt = require("bcrypt");
const middleware = require("../../../middleware/validator");

var userData;
var otpCode;
var Auth = {
  validator: (request, callback) => {
    Auth.checkEmailused(request, (isUsed) => {
      if (isUsed != null) {
        callback("2", { keyword: "rest_keyword_user_null", content: {} }, {});
      } else {
        var otp = comman.randomotp();
        comman.sendmail(
          request.email,
          "OTP Verification",
          `<h3>OTP : ${otp}</h3>`,
          (issent) => {
            if (issent) {
              callback(
                "1",
                { keyword: "rest_keyword_user_verify", content: {} },
                { otp: otp }
              );
            } else {
              callback(
                "0",
                { keyword: "rest_keyword_error_message", content: {} },
                {}
              );
            }
          }
        );
      }
    });
  },

  signup: (request, callback) => {
    Auth.checkEmailused(request, (isUsed) => {
      if (isUsed) {
        callback("0",{ keyword: "rest_keyword_unique_email", content: {} },{});
      } else {
        if (request.login_type == "S") {
          var password;
          console.log(password);
          middleware.encryption(request.password, (response) => {
            password = response;
          });
        } else {
          password = "";
        }

        var userdata = {
          // profile:request.profile != undefined ? request.profile : "default.jpg",

          name: request.name,
          code: request.code,
          mobile: request.mobile,
          email: request.email,
          email_verify: request.email_verify,
          role: request.role,
          location: request.location,
          latitude: request.latitude,
          longitude: request.longitude,
          login_type: request.login_type,
          // login_status:request.login_status,

          // password:request.password,
          password:
            request.login_time != "F" && request.login_time != "G"
              ? password
              : password,
        };

        con.query(`INSERT INTO tbl_user SET ?`, [userdata], (error, result) => {
          // console.log("error1", error);
          // console.log("error", error);
          if (!error) {
            var user_id = result.insertId;
            // console.log("error", error);

            Auth.getuserdetails(user_id, (userdata) => {
              if (userdata == null) {
                callback("2",{ keyword: "rest_keyword_user_null", content: {} },{});
              } else {
                common.checkUpdateToken(user_id, request, (token) => {
                  if (request.role == "user") {
                    Auth.getuserdetails(user_id, (userdata) => {
                      userdata.token = token;
                      if (userdata == null) {
                        callback("2",{keyword: "rest_keyword_user_not_signup",content: {},},{});
                      } else {
                        callback("1",{ keyword: " User Sign up sucessfully", content: {} },userdata);
                      }
                    });
                  } else {
                    Auth.gettrainerdetails(user_id, (userdata) => {
                      userdata.token = token;
                      if (userdata == null) {
                        callback("2",{keyword: "rest_keyword_user_vendor_not_signup",content: {},},{});
                      } else {
                        callback("1",{keyword: "rest_keyword_vendor_signup",content: {},},userdata);
                      }
                    });
                  }
                });
              }
            });
            // console.log("error",error);
          } else {
            callback("0",{ keyword: "rest_keyword_error_message", content: {} },{} );
          }
        });
        // console.log(response);
      }
    });
  },
  //Verify

  verifyOtp: (request, callback) => {
    var sql =
      "SELECT * FROM tbl_user WHERE otp_code = ? AND is_active = 1 AND is_delete = 0";
    con.query(sql, [request.otp_code], (error, result) => {
      if (!error && result.length > 0) {
        common.checkUpdateToken(result[0].id, request, (token) => {
          console.log("Token:", token);
          Auth.ValidateUser(result.id, (userdata) => {
            // userdata.token =token;
            callback("1",{ keywords: "rest_keywords_otp_message", content: {} },userdata);
          });
        });
      } else {
        callback("0",{ keywords: "rest_keywords_otp_not_match_message", content: {} },{});
        // console.log('verify error',error);
      }
    });
  },
  // resend otp

  sendotp: (request, callback) => {
    var sql ="UPDATE tbl_user WHERE otp = ? AND is_active = 1 AND is_delete = 0";
    con.query(sql, [request.otp], (error, result) => {
      if (!error && result.length > 0) {
        console.log(result);
        callback("1",{ keywords: "rest_keywords_resend_otp_message", content: {} },{});
      } else {
        callback("0",{ keywords: "rest_keywords_resend_otp_not_match_message",content: {},},{});
        console.log("resend otp error", error);
      }
    });
  },

  getuserdetails: (user_id, callback) => {
    con.query(
      `SELECT u.name,u.code,u.mobile,u.email,u.role,ifnull(di.token,'') as token,ifnull(di.device_type,'') as device_type,ifnull(di.device_token,'') as device_token,u.role,u.login_status,DATE_FORMAT(u.login_time, '%d-%m-%Y %H:%i %p') as last_login,is_forget FROM tbl_user u
        LEFT JOIN tbl_device_info di ON di.user_id = u.id
        WHERE u.id = ? AND u.is_active = 1;`, [user_id],(error, result) => {
        var userdata = result[0];
        console.log(userdata);

        if (!error && result.length > 0) {
          callback(userdata);
        } else {
          callback(userdata);
        }
      }
    );
  },

  gettrainerdetails: (user_id, callback) => {
    con.query(
      `SELECT u.name,u.code,u.mobile,u.email,ifnull(di.token,'') as token,ifnull(di.device_type,'') as device_type,ifnull(di.device_token,'') as device_token,u.role,u.login_status,DATE_FORMAT(u.login_time, '%d-%m-%Y %H:%i %p') as last_login  FROM tbl_user u
        LEFT JOIN tbl_device_info di ON di.user_id = u.id
        WHERE u.id = ? AND u.is_active = 1 `,[user_id], (error, result) => {
        console.log(error);
        var userdata = result[0];

        if (!error && result.length > 0) {
          callback(userdata);
        } else {
          callback(userdata);
        }
      }
    );
  },

  login: (request, callback) => {
    // console.log("error:",request);
    if (request.login_type == "S") {
      con.query(`SELECT * FROM tbl_user WHERE email = ?`,[request.email],(error, result) => {
          // console.log("error:",result);
          if (!error && result.length > 0) {
            var cpassword;
            middleware.encryption(request.password, (response) => {
              cpassword = response;
            });

            if (cpassword == result[0].password) {
              Auth.getuserdetails(result[0].id, (userdata) => {
                if (userdata == null) {
                  callback("2",{ keyword: "rest_keyword_user_null", content: {} },{});
                } else {
                  var update_status = {
                    login_status: "Online",
                    login_time: new Date(),
                  };

                  con.query(`UPDATE tbl_user SET ? WHERE id = ?`, [update_status, result[0].id],(error, response) => {
                      comman.checkUpdateToken(result[0].id,request,(token) => {
                          userdata.token = token;
                          if (result[0].role == "user") {
                            Auth.getuserdetails(result[0].id, (userdata) => {
                              //  console.log('getdetails:',);
                              callback("1",{keyword: "rest_keyword_user_login",content: {},},userdata);
                            });
                          } else {
                            Auth.gettrainerdetails(result[0].id, (userdata) => {
                              //  console.log('gettrainer:',gettrainerdetails);
                              callback( "1",{keyword: "rest_keyword_vendor_login",content: {},},userdata);
                            });
                          }
                        }
                      );
                    }
                  );
                }
              });
            } else {
              console.log(error);
              callback("0",{ keyword: "rest_keyword_invalid_password", content: {} }, {});
            }
          } else {
            callback("0",{ keyword: "rest_keyword_invalid_email", content: {} },{});
          }
        }
      );
    } else {
      con.query(`SELECT * FROM tbl_user WHERE social_id = ?`,[request.social_id],(error, result) => {
          if (!error && result.length > 0) {
            Auth.getuserdetails(result[0].id, (userdata) => {
              if (userdata == null) {
                callback("2",{ keyword: "rest_keyword_user_null", content: {} },{});
              } else {
                var update_status = {
                  login_status: "Online",
                  login_time: new Date(),
                };

                con.query(`UPDATE tbl_user SET ? WHERE id = ?`,[update_status, result[0].id],(error, response) => {
                    comman.checkUpdateToken(result[0].id, request, (token) => {
                      userdata.token = token;
                      Auth.getuserdetails(result[0].id, (userdata) => {
                        callback("1",{ keyword: "rest_keyword_user_login", content: {} },userdata);
                      });
                    });
                  }
                );
              }
            });
          } else {
            callback("0", { keyword: "rest_keyword_invalid_email", content: {} },{});
          }
        }
      );
    }
  },

  logout: (request, callback) => {
    var update_device = {
      token: "",
      device_type: "",
      device_token: "",
    };

    con.query(`UPDATE tbl_device_info SET ? WHERE user_id = ?`,[update_device, request.user_id],(error, result) => {
        if (!error) {
          // console.log("error", request.role);
          if (request.role == "user") {
            Auth.getuserdetails(request.user_id, (userdata) => {
              if (userdata == null) {
                // console.log("ddfsssssssssssssssss.....................", error);
                callback( "2", { keyword: "rest_keyword_user_null", content: {} },{});
              } else {
                var updObj = {
                  login_status: "offline",
                  // login_time :"null"
                };
                con.query( `UPDATE tbl_user SET ? WHERE id = ?`,[updObj, request.user_id], (error, result) => {
                    if (!error) {
                      Auth.getuserdetails(request.user_id, (userdata) => {
                        callback("2", { keyword: "rest_keyword_user_logout", content: {} },  userdata );
                      });
                    } else {
                      callback("0", { keyword: "rest_keyword_error_message", content: {} }, {} );
                    }
                  }
                );
              }
            });
          } else {
            Auth.gettrainerdetails(request.user_id, (userdata) => {
              if (userdata == null) {
                // console.log("ddfssssssssssssffffffffffffffffsssss.....................",error);
                callback( "2", { keyword: "rest_keyword_user_null", content: {} },{});
              }
               else {
                var updObj = {
                  login_status: "offline",
                  // login_time :"null"
                };
                con.query( `UPDATE tbl_user SET ? WHERE id = ?`,[updObj, request.user_id],(error, result) => {
                    if (!error) {
                      if (request.role == "user") {
                        Auth.getuserdetails(request.user_id, (userdata) => {
                          callback( "1",{ keyword: "rest_keyword_user_logout", content: {}, },userdata );
                        });
                      } else {
                        Auth.gettrainerdetails(request.user_id, (userdata) => {
                          callback( "1",{keyword: "rest_keyword_vendor_logout",content: {}, },userdata);
                        });
                      }
                    } else {
                      // console.log('sadddddddddddddddddddddddddddddddd//////////////////////////......',error)
                      callback( "0",{ keyword: "rest_keyword_error_message", content: {} },{} );
                    }
                  }
                );
              }
            });
          }
        } else {
          callback("0",{ keyword: "rest_keyword_error_message", content: {} }, {});
        }
      }
    );
  },

  checkEmailused: (request, callback) => {
    con.query(`SELECT * FROM tbl_user WHERE email = ? AND is_active = '1' AND is_delete = '0'`,[request.email],(error, result) => {
        if (!error && result.length > 0) {
          callback(true);
        } else {
          callback(false);
        }
      }
    );
  },

  checkMobileNumberUsed: (request, callback) => {
    con.query(`SELECT * FROM tbl_user WHERE mobile = ? AND is_active = '1' AND is_delete = '0'`,[request.mobile],(error, result) => {
        if (!error && result.length > 0) {
          callback(true);
        } else {
          callback(false);
        }
      }
    );
  },

  forgotpassword: (request, callback) => {
    if (request.login_type === "S") {
      con.query("SELECT * FROM tbl_user WHERE email = ? AND is_active = 1 AND is_delete = 0",[request.email],(error, result) => {
          if (!error && result.length > 0) {
            var data = result[0];
            emailtemplate.forgotpass(data, (forgotpass) => {
              common.sendmail(request.email,"Forgot Password",forgotpass,(isSent) => {
                  if (isSent) {
                    var forgotdata = {
                      is_forget: "1",
                      forget_time: new Date(),
                    };

                    con.query(`UPDATE tbl_user SET ? WHERE id = ?`,[forgotdata, data.id],(error, result) => {
                        // console.log("log", error);
                        if (!error) {
                          if (data.role == "user") {
                            //  console.log(result.role);
                            Auth.getuserdetails(data.id, (data) => {
                              // console.log(data.id);
                              if (data == null) {
                                callback("2",{keyword: "rest_keyword_user_null for user",content: {},},{});
                              } else {
                                callback("1",{keyword:"rest_keyword_password_forget for user",content: {},},data);
                              }
                            });
                          } else {
                            Auth.gettrainerdetails(data.id, (data) => {
                              if (data == null) {
                                callback("2",{ keyword:"rest_keyword_user_null for vendor",content: {},},{});
                              } else {
                                callback( "1",{keyword:"rest_keyword_password_forget for vendor", content: {},},data);
                              }
                            });
                          }
                        } else {
                          console.log("eroroorororr", error);
                          callback("0",{keyword: "rest_keyword_password_not_forget",content: {},}, {});
                        }
                      }
                    );
                  } else {
                    callback("2",{ keyword: "rest_keyword_email_not_found", content: {} },{});
                  }
                }
              );
            });
          } else {
            callback("0",{ keyword: "rest_keyword_error_message", content: {} },{});
          }
        }
      );
    } else {
      callback("0", { keyword: "user not exist", content: {} }, {});
    }
  },

  resetpassword: (request, id, callback) => {
    var password;
    middleware.encryption(request.password, (response) => {
      password = response;
    });

    updObj = {
      password: password,
    };

    con.query(`UPDATE tbl_user SET ? WHERE id = ?`,[updObj, id],(error, result) => {
        if (!error) {
          Auth.getuserdetails(id, (userdata) => {
            if (userdata == null) {
              callback("2",{ keyword: "rest_keyword_user_null", content: {} },{});
            } else {
              callback("1", { keyword: "rest_keyword_password_forget", content: {} },userdata);
            }
          });
        } else {
          callback("0",{ keyword: "rest_keyword_error_message", content: {} },{});
        }
      }
    );
  },

  // chengepassword

  changepassword: (request, user_id, callback) => {
    var password;
    middleware.encryption(request.new_password, (response) => {
      password = response;
    });

    con.query(`UPDATE tbl_user SET password = '${password}' WHERE id = ${user_id}`,(error, result) => {
        if (!error) {
          callback("1",{ keyword: "rest_keyword_password_update ", content: {} },{});
        } else {
          callback("0", { keyword: "rest_keyword_password_not_update ", content: {} },error);
        }
      }
    );
  },

  ValidateUser: function (request, callback) {
    Auth.checkMobileNumberUsed(request, (iused) => {
      if (iused) {
        callback(0, { keyword: "rest_keyword_unique_mobile" }, null);
      } else {
        var otp = Auth.generateOTP();
        const accountSid = "AC2884633ccb5f8679d79992e5c0a1e659"; // Your Account SID from https://www.twilio.com/console
        const authToken = "67015d108a17037097480877bb287a36"; // Your Auth Token from https://www.twilio.com/console

        const client = require("twilio")(accountSid, authToken);
        const message = client.messages.create({
          body:"Hello,This message is from node js team this is your otp " +otp + "",
          to: "+91'" + request.mobile + "'",
          from: "+13156442435",
        });
        callback("1", { keyword: "rest_keywords_otp_sent", content: {} }, otp);

        // You can implement your fallback code here
      }
    });
  },

  generateOTP: function () {
    // Declare a digits variable
    // which stores all digits
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  },

  sendOtp: (request, callback) => {
    var sql ="UPDATE tbl_user WHERE otp = ? AND is_active = 1 AND is_delete = 0";
    con.query(sql, [request.otp], (error, result) => {
      if (!error && result.length > 0) {
        console.log(result);
        callback("1",{ keywords: "rest_keywords_resend_otp_message", content: {} },{});
      } else {
        callback("0",{ keywords: "rest_keywords_resend_otp_not_match_message",content: {},},{});
        console.log("resend otp error", error);
      }
    });
  },
};
module.exports = Auth;
