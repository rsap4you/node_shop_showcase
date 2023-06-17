const { request, response } = require("express");
var asyncLoop = require("node-async-loop");
const common = require("../../../config/common");
const GLOBALS = require("../../../config/constant");
const emailtemplate = require("../../../config/template");
const language = require("../../../language/en");
const language1 = require("../../../language/hin");
con = require("../../../config/database");
const moment = require("moment");
const users = require("../auth/modal.js");
const Auth = require("../auth/modal.js");
var randomtoken = require("rand-token").generator();
var usersession = randomtoken.generate(64,"0123456789abcdefghijklmnopqrstuvwxyz");

var Service = {
  Filter: (request, callback) => {
    //category
    if (request.category_type != "" && request.category_type != undefined) {
      var category_type = `having c.category_type = '${request.category_type}' order by c.category_type DESC `;
    } else {
      category_type = "";
    }
    //distance
    if (request.distance != "" && request.distance != undefined) {
      var distance = `having distance <='${request.distance}' order by distance DESC`;
    } else {
      distance = "";
    }
  // rating
    if (request.rating != "" && request.rating != undefined) {
      var rating = `having s.rating >= '${request.rating}' order by s.rating DESC`;
    } else {
      rating = "";
    }
    //sortin new-page
    var condition;
    var sortin = request.sortin;
    var sortby = request.sortby;

    if (request.sortby != undefined) {
      if (sortby == "distance") {
        if (sortin == "DESC") {
          condition = `ORDER BY distance DESC`;
        } else {
          condition = `ORDER BY distance ASC`;
        }
      }

      if (sortby == "rating") {
        if (sortin == "DESC") {
          condition = `ORDER BY s.rating DESC`;
        } else {
          condition = `ORDER BY s.rating ASC`;
        }
      }

      if (sortby == "category_type") {
        if (sortin == "DESC") {
          condition = `ORDER BY c.category_type DESC`;
        } else {
          condition = `ORDER BY c.category_type ASC`;
        }
      }
    } else {
      condition = ``;
    }

    Service.getuser(request, (userDetials) => {
      // console.log(latitude)
      var sql = `SELECT s.id as shop_id,CONCAT('${GLOBALS.PORT_BASE_URL}','${GLOBALS.post}',s.shop_logo) shop_image,s.name,s.email,s.phone,s.address,s.latitude,s.longitude,c.category_type,s.rating, CONCAT(ROUND((6371 * acos(cos(radians(${userDetials.latitude})) * cos(radians(s.latitude)) * cos(radians(s.longitude) - radians(${userDetials.longitude})) + sin(radians(${userDetials.latitude})) * sin(radians(s.latitude)))), 2), ' km away') AS distance FROM tbl_shop s 
      JOIN tbl_category c on c.id = s.category_id
      JOIN tbl_user  u on u.id=s.user_id
      GROUP BY s.id ${category_type} ${distance} ${rating}`;
      
      sql += condition;
      console.log(userDetials)
      con.query(sql,(error, result) => {
        console.log('errorwqewqeffffg:',condition )
        // console.log(sql);
        //  console.log(result);

        if (!error ) {
          callback("1",{ keyword: "rest_keyword_filter", content: {} },result);
        } else {
          console.log('errornbcdsdbhjsbj:',error)
          callback("0",{ keyword: "rest_keyword_not_filter", content: {} },{});
        }
      });
    });
  },

  getuser: (user_id, callback) => {
    con.query(`Select *  from tbl_shop `,[user_id],(error, result) => {
        // console.log("error111:", result[0]);
        var userDetials = result[0];
        if (!error && result.length > 0) {
          // console.log(userDetialss)
          callback(userDetials);
        } else {
          callback(userDetials);
        }
      }
    );
  },
 
  shopDetials: (user_id, callback) => {
    con.query(`Select *  from tbl_shop `,[user_id],(error, result) => {
        if (!error ) {
          callback("1",{ keyword: "shop details show", content: {} },result);
        }
         else {
          callback("1",{ keyword: "shop details not show ", content: {} },result);
        }
  })
},

shopdetails: (request,shop_id,callback)=>{
  con.query(`Select s.id as shop_id,s.shop_logo,s.name as shop_name,s.address,CONCAT(ROUND(6371 * acos( 
    cos( radians(s.latitude) ) 
  * cos( radians( u.latitude ) ) 
  * cos( radians( u.longitude ) - radians(s.longitude) )       
  + sin( radians(s.latitude) ) 
  * sin( radians(u.latitude ) )
) , 2), ' km away') as distance,s.rating,s.email,s.phone  from tbl_shop s
JOIN tbl_user u  
where s.id=? group by s.id`,[request.shop_id],(error, shopdata) => {
    // console.log('asdjkkkkkkkkkkkkkkkkkkkkkkkkkkk........................',request.shop_id)
    if (!error ) {
      con.query(`select pi.id as image_id,pi.image,p.id as product_id,p.product_name,p.product_description,p.price from tbl_product p
       join tbl_shop s on s.id=p.shop_id 
      join tbl_product_image pi on pi.shop_id=p.shop_id
      where s.id=${request.shop_id} group by pi.image
       `,[request.shop_id],(error,productdata)=>{
        if(!error){

          callback("1",{ keyword: "rest_keyword_shop_show", content: {} },{shopdata,productdata});
        }
        else{
          callback("0",{ keyword: "rest_keyword_shop_not_show", content: {} },error); 
        }
      })
    }
     else {
      // console.log('..........................',error)
      callback("2",{ keyword: "rest_keyword_shop_not_show ", content: {} },{});
    }
})

},

 
};

module.exports = Service;


