var massages = {
  //required messages
  "required" : "आप : attr फ़ील्ड भूल गए हैं",
  "email": "विद्युतडाक मान्य नहीं है",
  "rest_keyword_required_massage": "आप : attr फ़ील्ड भूल गए हैं",
//unique value messages
  "rest_keyword_unique_email": "हे {उपयोगकर्ता नाम}! यह ईमेल पहले से ही इस्तेमाल किया जा रहा है।",
  "rest_keyword_unique_mobile": "हे {उपयोगकर्ता नाम}! यह मोबाइल पहले से ही इस्तेमाल किया जा रहा है।",
// something went wrong 
"rest_keyword_error_message": "कुछ गलत हो गया", //code 0
"rest_keyword_user_null":"नहीं मिला",
"rest_keyword_invalid_password":"पासवर्ड मान्य नहीं है",//code 0
"rest_keyword_invalid_email":"ईमेल मान्य नहीं है",//code 0
//auth messages
// signup
  "rest_keyword_user_get": "उपयोगकर्ता सफलतापूर्वक प्राप्त करें (:", //code 1
  "rest_keyword_trainer_signup": "ट्रेनर साइनअप सफलतापूर्वक", //code 1
  "rest_keyword_trainer_not_signup": "ट्रेनर साइनअप नहीं ", //code 2
  "rest_keyword_user_signup": "उपयोगकर्ता साइनअप सफलतापूर्वक ", //code 1
  "rest_keyword_user_not_signup": "उपयोगकर्ता साइनअप नहीं करता है ", //code 2
  //  otp sent 
  "rest_keywords_otp_sent":"ओटीपी सफलतापूर्वक भेजा गया",
  // otp verify
  "rest_keywords_otp_message":"ओटीपी का मिलान हुआ",
  "rest_keywords_otp_not_match_message":"ओटीपी मेल नहीं खा रहा है",
  // 
  // login
  "rest_keyword_user_login": "उपयोगकर्ता लॉगिन सफलतापूर्वक",//code 1
  "rest_keyword_user_not_login": "उपयोगकर्ता नहीं मिला",//code 2
  "rest_keyword_trainer_login": "प्रशिक्षक लॉगिन सफलतापूर्वक",//code 1
  "rest_keyword_trainer_not_login": "ट्रेनर नहीं मिला",//code 2
  // logout
  "rest_keyword_user_logout":"उपयोगकर्ता लॉगआउट सफलतापूर्वक",
  "rest_keyword_trainer_logout":"ट्रेनर लॉगआउट सफलतापूर्वक",
  // forget password
  "rest_keyword_password_forget for user":"उपयोगकर्ता पासवर्ड भूल गया ईमेल भेजा गया",//code 1
  "rest_keyword_password_forget for user":"उपयोगकर्ता ईमेल नहीं मिला",//code 2
  "rest_keyword_password_forget for trainer":"ट्रेनर भूल गया पासवर्ड ईमेल भेजा गया",//code 1
  "rest_keyword_user_null for tariner":"ट्रेनर ईमेल नहीं मिला",//code 2
  // update password
  "rest_keyword_password_update ":"पासवर्ड उपदटेड",//code 1
  "rest_keyword_password_not_update ":"पासवर्ड नोट ुपड़ते",//code 0
  "rest_keyword_password_update for trainer":"ट्रेनर पासवर्ड उपदटेड",//code 1
  "rest_keyword_password_not_update for trainer":"ट्रेनर पासवर्ड अपडेट नहीं किया गया",//code 1
  // complete profile
  "rest_keyword_user_complete_profile":"पूर्ण प्रोफ़ाइल सफलता",
  "rest_keyword_user_not_complete_profile":"उपयोगकर्ता नहीं मिला",
  //  card details
  "rest_keyword_card_details":"कार्ड डेटा डाला गया ",
  "rest_keyword_card_details_not":"कार्ड डेटा नहीं डाला गया ",
  //  delete card 
  "rest_keyword_card_details_delete":"कार्ड डेटा हटाया गया",
  "rest_keyword_card_details_delete_not":"कार्ड डेटा डिलीट नहीं ",
//  complete myprofile
"rest_keyword_user_profile_updated ":"उपयोगकर्ता प्रोफ़ाइल अपडेट की गई ",
"rest_keyword_trainer_profile_updated ":"ट्रेनर प्रोफाइल अपडेट किया गया ",
// myfitness profile
"rest_keyword_fitness_updated ":"फिटनेस डेटा अपडेट किया गया ",
"rest_keyword_fitness_not_updated ":"फ़िटनेस डेटा अपडेट नहीं होता",
//  CHAT 
"rest_keyword_Chat ":"चैट संदेश भेजा गया",
"rest_keyword_not_Chat ":"चैट संदेश नहीं भेजा गया",
// chat display
"rest_keyword_Chat_display ":"चैट संदेश प्रदर्शित किया गया",
"rest_keyword_Chat_not_display ":"चैट संदेश प्रदर्शित नहीं किया गया",

//  model 
// review
"rest_keyword_review ":"समीक्षा जोड़ी गई",
"rest_keyword_not_review ":"Rसमीक्षा जोड़ें नहीं",
//  my reviews show
"rest_keyword_myreviews ":"आपकी समीक्षा दर्शाती है ",
"rest_keyword_not_myreviews ":"आपकी समीक्षाएं नहीं मिलीं",
// block trainer
"rest_keyword_blocktrainer ":"ट्रेनर ब्लॉक ",
"rest_keyword_not_blocktrainer ":"ट्रेनर ब्लॉक नहीं करता",
// block trainer details
"rest_keyword_blocktrainer_details ":"विशेष उपयोगकर्ता के लिए ट्रेनर काले जूते",
// unblock trainer
"rest_keyword_unblocktrainer ":"ट्रेनर अनब्लॉक ",
"rest_keyword_not_unblocktrainer ":"ट्रेनर अनब्लॉक नहीं ",
//  search details
"rest_keyword_search_details ":"खोज आइटम सफलतापूर्वक प्रदर्शित किया गया ",
"rest_keyword_search_not_details ":"आपका अनुरोध नहीं मिला! कृपया पुन: प्रयास करें  ",
// trainer profile
"rest_keyword_trainer_profile ":"ट्रेनर प्रोफाइल शो  ",
"rest_keyword_trainer_not_profile ":"ट्रेनर प्रोफाइल नहीं दिखा ",
//  map view
"rest_keyword_mapview":"आस-पास के ट्रेनर शो  ",
"rest_keyword_not_mapview":"प्रशिक्षक नहीं मिले ",
//  home page
"rest_keyword_homepage":" मुखपृष्ठ दिखाएँ ",
"rest_keyword_not_homepage":" होमपेज डेटा नहीं मिला ",
//  filter
"rest_keyword_filter":" फ़िल्टर पृष्ठ डेटा मिला ",
"rest_keyword_not_filter":" फ़िल्टर पृष्ठ डेटा नहीं मिला ",
// book trainer
"rest_keyword_bookslot":" स्लॉट बुकिंग की पुष्टि ",
"rest_keyword_not_bookslot":" स्लॉट बुकिंग की पुष्टि नहीं",
"rest_keyword_slot_already":" स्लॉट पहले ही बुक हो चुका है",
//  running booking
"rest_keyword_order_details":" आदेश विवरण मिला",
"rest_keyword_not_order_details":" आदेश विवरण नहीं मिला ",
// order accepted
"rest_keyword_order_accepted":" आदेश विवरण स्वीकार किए जाते हैं",
"rest_keyword_not_order_accepted":" आदेश विवरण स्वीकार नहीं",
// cancel order booking
"rest_keyword_order_cancel":" बुकिंग आदेश रद्द करें",
"rest_keyword_order_notfound":" बुकिंग नहीं मिली",
//  my booking screen details
"rest_keyword_mybooking_details":" मेरी बुकिंग चालू स्क्रीन प्रदर्शित की गई",
"rest_keyword_mybooking_details_notfound":" मेरा बुकिंग डेटा नहीं मिला ",
//  notification added
"rest_keyword_add_notification":" अधिसूचना जोड़ा सफलता",
"rest_keyword_add_notification_not":" अधिसूचना जोड़ें नहीं",
//  notification show
"rest_keyword_notification_show":"अधिसूचना शो ",
"rest_keyword_notification_not_show":"नोटिफिकेशन नहीं दिखा ",

//  hlinkshop task 
// show shop details 
"rest_keyword_shop_not_show":"दुकान विवरण नहीं दिखा",//code 0
"rest_keyword_shop_show":"दुकान विवरण  दिखा", //code 1

}
module.exports = massages;