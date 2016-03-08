<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <link href='https://fonts.googleapis.com/css?family=Slabo+27px|Lato' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/style.css">
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="js/place_search.js"></script>
    <script src = "http://plus.google.com/js/client:platform.js" async defer></script>
    <script src="https://apis.google.com/js/client.js" async defer></script>
    
    <script src="jq_chart/js/jquery.mousewheel.js" type="text/javascript"></script>
    <script src="jq_chart/js/jquery.jqChart.min.js" type="text/javascript"></script>
    <script src="jq_chart/js/jquery.jqRangeSlider.min.js" type="text/javascript"></script>
    <script src="js/google.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPOZ8eYlJ-hVhVd5Ye977pQte5NG7xz7s&libraries=places&callback=initAutocomplete&signed_in=true&libraries=places,visualization"
    async defer></script>
    <title>One Touch</title>
  </head>
  <body>
   
      <div id="back_btn"><</div>
      <div id="lines"></div>
     <nav class="nav-option">
      <ul>
       <li> 
          <button id="mail_box" class="g-signin"
            data-scope="email"
            data-clientid="138230497832-e524d5qpd4tkgl45g27nct1j1gb651oc.apps.googleusercontent.com"
            data-callback="onSignInCallback"
            data-theme="dark"
            data-cookiepolicy="single_host_origin">
            Sign In
        </button></li>
        <li id="back_to_main"><a href="javascript:void(0)">< Back to Main</a></li>
        <li><a href="javascript:void(0)" id="profile_details">My Profile</a></li>
        <li><a href="javascript:void(0)" id="location_access">Search</a></li>
        <li><a href="javascript:void(0)" id="check_mail">Mail</a></li>
        <li><a href="javascript:void(0)" id="weather_report">Weather Forecast</a></li>
        <!-- <li><a id="fb-login" href="#"></a></li> -->
        <li class="facebook_img">
          <a id="facebook_profile" target="_blank" href="#"><img src="image/fb.ico" width="32px" height="30px" alt="Direct redirect to your profile"></a></li>
           <span
            class="fb-like"
            data-share="false"
            data-width="240"
            data-show-faces="true"
            id="fb_like_btn">
          </span>

        <span id="current_time"></span>
        <span id="city"></span>
        <a href="#" target="_blank" id="user_name"></a>
      </ul>
     </nav>
      <aside class="up_">
        <ul id="Location_name"></ul>
      </aside>
      
      <div class="mail_popup">
          <div class="detail_header">
           <span></span><span>Email Snippet</span>
           <button id="close">X</button>
          </div>
          <!-- <div class="drop_down_option_label">
            <select id="label_list"></select>
          </div> -->
          <div class="mail_box_over_popup">
            <ul class="mail_list_container" id="mail_container"></ul>
          </div>
      </div>

      <div class="profile_details_popup popup_profile">
          <div class="detail_header">
           <a href="#" target="_blank" id="name"></a>
           <button id="close">X</button>
          </div>

          <div class="detail-section">
            <span class="profile-img">
              <img src="#" id="img_profile" width="120px" height="120px;">
            </span>
            <span class="user_profile_data">
            <ul>
              <li>User's ID :   <span id="profile_id"></span></li>
              <li>Gender :   <span id="gender"></span></li>
              <li>Email Address :   <span id="email"></span></li>
            </ul>
            </span>
          </div>
      </div>

      <div class="weather-forecast">
        <button class="close" id="close">X</button>
        <div class="toggle_btn">
          <span id="weather_status" class="active"> Weather Status </span>
          <span id="weather_forecast"> Weather Forecast </span>
        </div>
        <div class="weather_casting">
          <div class="city-weather"><h2 class="weather-head" id="city_name"></h2></div>
          <div class="city-humidity">Humidity : <h2 class="weather-head" id="city_humid"></h2><sup>%</sup></div>
          <div class="city-temp">Temperature : <h2 class="weather-head" id="city_temp"></h2><sup>o</sup>C</div>
          <div class="city-status">Current Status : <h2 class="weather-head" id="city_status"></h2></div>
          <img src="#" id="weather_img" class="weather-icon" alt="weather">
        </div>
        <div class="weather_forecasting">
            Next 7 days Weather Forecasting
            <div class="forecast-details">
             <div id="jqChart" style="width: 570px; height: 300px;"></div>
             <ul id="forecast_data"></ul>
            </div>
        </div>
      </div>

      <input id="pac-input" class="controls" type="text" placeholder="Search Box">
      <select id="resturant-input" class="controls">
        <option>--- Select ---</option>
      </select>
    

      <div id="place_details"></div>
      <div id="map2"></div>
        <div id="map"></div>
       <div class="overlay"></div>
  </body>
  

</html>