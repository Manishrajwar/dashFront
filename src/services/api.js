// const BASE_URL = process.env.REACT_APP_BASE_URL


const baseurl = "http://54.206.82.18/api"


// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: baseurl + "/users/",
  LOGIN_API: baseurl + "/token/",
  LOGOUT_API: baseurl + "/token/blacklist/",
  FORGOT_PASSWORD_API: baseurl + "/password_reset/",
  CHECK_USERDETAILS_API: baseurl + "/users/retrieve_user/",
  GET_ALL_USERS_API: baseurl + "/users",
  REFRESH_TOKEN_API: baseurl + "/token/refresh/",
  USER_UPDATE_API: baseurl + "/users/",
  DELETE_USER_API: baseurl + "/users/",
  CHANGE_PASSWORD_API : baseurl + "/password_reset/confirm/",
  TWITTER_AUTHORIZE_API : baseurl + "/twitter-authorize-url/",
  TWITTER_AUTHENTICATE_API : baseurl + "/twitter-authenticate/" , 
  ACCOUNT_SEARCH_API : baseurl + "/scraper-detail/accounts/?search=",
  POST_INFLUENCER_API : baseurl + "/scraper-detail/",
  ENGAGEMENT_API : baseurl  +"/scraper-detail/engagement/",
  TWEET_GENERATING_API : baseurl + "/tweet-generation/generate-tweets/",
   ADMIN_PROMPT_API : baseurl +"/tweet-generation/admin-prompt/" , 
   SCHEDULE_TWEET_API : baseurl + "/tweet-generation/schedule-tweets/",
   REPORT_API: baseurl + "/tweet-generation/get-logs/" , 
   GET_TWEET_REPORT_API : baseurl + "/scraper-detail/get-tweets/" , 
   FETCH_ALL_SCHEDULE_API : baseurl + "/tweet-generation/get-schedule-tweets/" , 
   AUTOMATE_API : baseurl  + "/automate/" , 
   SAVE_PROMPT_GENERATE_API : baseurl + "/tweet-generation/tweet-specs/" , 
   REGENERATE_SCHEDULE_API : baseurl + "/tweet-generation/regenerate-scheduled-tweet/"
  
};
