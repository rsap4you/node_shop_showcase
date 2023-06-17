var massages = {
  //required messages
  "required" : "You forgot the :attr field",
  "email": "email is not valid",
  "rest_keyword_required_massage": "You forgot the :attr field",
//unique value messages
  "rest_keyword_unique_email": "Hey {username}! This email is already being used.",
  "rest_keyword_unique_mobile": "Hey {username}! This mobile is already being used.",
// something went wrong 
"rest_keyword_error_message": "Something went wrong", //code 0
"rest_keyword_user_null":"Not found",
"rest_keyword_invalid_password":"Password not Valid",//code 0
"rest_keyword_invalid_email":"Email not Valid",//code 0
//auth messages
// signup
  "rest_keyword_user_get": "user get successfully (:", //code 1
  "rest_keyword_vendor_signup": "Vendor Signup successfully", //code 1
  "rest_keyword_vendor_not_signup": "Vendor not Signup ", //code 2
  "rest_keyword_user_signup": "user Signup successfully  ", //code 1
  "rest_keyword_user_not_signup": "user not Signup  ", //code 2
  //  otp sent 
  "rest_keywords_otp_sent":"Otp  Sent Successfully",
  // otp verify
  "rest_keywords_otp_message":"Otp matched",
  "rest_keywords_otp_not_match_message":"Otp not match",
  // 
  // login
  "rest_keyword_user_login": "User login successfully",//code 1
  "rest_keyword_user_not_login": "User not found",//code 2
  "rest_keyword_vendor_login": "vendor login successfully",//code 1
  "rest_keyword_vendor_not_login": "vendor not found",//code 2
  // logout
  "rest_keyword_user_logout":"User logout sucessfully",
  "rest_keyword_vendor_logout":"sucessfully logout",
  // forget password
  "rest_keyword_password_forget for user":"User forget password email sent",//code 1
  "rest_keyword_password_forget for user_null":"User  email not found",//code 2
  "rest_keyword_password_forget for vendor":"vendor forget password email sent",//code 1
  "rest_keyword_user_null for vendor":"vendor email not found",//code 2
  // update password
  "rest_keyword_password_update ":"Password Upadted",//code 1
  "rest_keyword_password_not_update ":"Password not Upadte",//code 0
  "rest_keyword_password_update for trainer":"Trainer Password Upadted",//code 1
  "rest_keyword_password_not_update for trainer":"Trainer password  not Upadte",//code 1
  // complete profile
  "rest_keyword_user_complete_profile":"Complete Profile sucess",
  "rest_keyword_user_not_complete_profile":"User Not found",
  //  card details
  "rest_keyword_card_details":"Card data inserted ",
  "rest_keyword_card_details_not":"Card data  not insert ",
  //  delete card 
  "rest_keyword_card_details_delete":"Card data Deleted",
  "rest_keyword_card_details_delete_not":"Card data not Delete ",
//  complete myprofile
"rest_keyword_user_profile_updated ":"user  profile updated ",
"rest_keyword_trainer_profile_updated ":"Trainer  profile updated ",
// myfitness profile
"rest_keyword_fitness_updated ":"Fitness data updated ",
"rest_keyword_fitness_not_updated ":"Fitness data not update ",
//  CHAT 
"rest_keyword_Chat ":"Chat message sent",
"rest_keyword_not_Chat ":"Chat message not sent",
// chat display
"rest_keyword_Chat_display ": "Chat Message Displayed",
"rest_keyword_Chat_not_display ":"Chat Message Not Displayed",

//  model 
// review
"rest_keyword_review ":"Review added",
"rest_keyword_not_review ":"Review not   add",
//  my reviews show
"rest_keyword_myreviews ":"your reviews show ",
"rest_keyword_not_myreviews ":"your reviews not found",
// block trainer
"rest_keyword_blocktrainer ":"Trainer block ",
"rest_keyword_not_blocktrainer ":"Trainer not block",
// block trainer details
"rest_keyword_blocktrainer_details ":"trainer block  show for particuler user ",
// unblock trainer
"rest_keyword_unblocktrainer ":"Trainer Unblock ",
"rest_keyword_not_unblocktrainer ":"Trainer not Unblock ",
//  search details
"rest_keyword_search_details ":"search item succesfully displayed ",
"rest_keyword_search_not_details ":"sNot Found your request ! please try again  ",
// trainer profile
"rest_keyword_trainer_profile ":"Trainer profile show  ",
"rest_keyword_trainer_not_profile ":"Trainer profile not show  ",
//  map view
"rest_keyword_mapview":"Nearby Trainers show ",
"rest_keyword_not_mapview":"Not found trainers  ",
//  home page
"rest_keyword_homepage":" Homepage Show  ",
"rest_keyword_not_homepage":" Not found Homepage data  ",
//  filter
"rest_keyword_filter":" Filter Page Data Found  ",
"rest_keyword_not_filter":" Filter Page Data Not Found  ",
// book trainer
"rest_keyword_bookslot":" Slot booking confirm  ",
"rest_keyword_not_bookslot":" Slot booking not confirm  ",
"rest_keyword_slot_already":" Slot already booked ",
//  running booking
"rest_keyword_order_details":" Order details found ",
"rest_keyword_not_order_details":" Order details not found ",
// order accepted
"rest_keyword_order_accepted":" Order details accepted",
"rest_keyword_not_order_accepted":" Order details  not accept",
// cancel order booking
"rest_keyword_order_cancel":" Cancel Booking order",
"rest_keyword_order_notfound":" Booking Not Found",
//  my booking screen details
"rest_keyword_mybooking_details":" My booking running screen displayed ",
"rest_keyword_mybooking_details_notfound":" My Booking Data Not Found ",
//  notification added
"rest_keyword_add_notification":" notification added success",
"rest_keyword_add_notification_not":" notification not add",
//  notification show
"rest_keyword_notification_show":" Notification show ",
"rest_keyword_notification_not_show":" Notification  not show ",

//  hlinkshop task 
// show shop details 
"rest_keyword_shop_not_show":"shop details not  show",
"rest_keyword_shop_show":"shop details show",
}
module.exports = massages;