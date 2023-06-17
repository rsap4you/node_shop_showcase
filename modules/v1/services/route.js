const con = require("../../../config/database");
const express = require("express");
const router = express.Router();
const middleware = require("../../../middleware/validator");
const Auth = require("../auth/modal");
const Service = require("../services/model");


router.post("/filter", (req, res) => {
  // middleware.decryption(req.body, (request) => {
    var request = req.body;
    var user_id = req.user_id;

    var rules = {
        // sender_id: "required",
        // receiver_id: "required",
    };

    var message = {
      required: req.language.required,
    };

    if (middleware.checkValidation(res, request, rules, message)) {
      Service.Filter(request, (code, message, data) => {
        middleware.sendResponse(req, res, code, message, data);
      });
    }
  // });
});


router.post("/shopdetails", (req, res) => {
  // middleware.decryption(req.body, (request) => {
    var request = req.body;
    var shop_id = req.shop_id;

    var rules = {
        shop_id: "required",
        // receiver_id: "required",
    };

    var message = {
      required: req.language.required,
    };

    if (middleware.checkValidation(res, request, rules, message)) {
      Service.shopdetails(request,shop_id,(code, message, data) => {
        middleware.sendResponse(req, res, code, message, data);
      });
    }
  // });
});




module.exports = router;
