function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}



function performSearch() {
    var request = {
        //bounds: map.getBounds(),
        keyword: 'best view'
    };
}

function callback(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
    }
    for (var i = 0, result; result = results[i]; i++) {
        addMarker(result);
    }
}


function hide_content(){
  $(".overlay").hide();
  $(".profile_details_popup").hide();
}
/* ready Function */
$(document).ready(function(){
  hide_content();  
 
  $("#profile_details").click(function(){
    $(".overlay").show();
    $(".profile_details_popup").show();
  });
  $("#close").click(function(){hide_content();});     
  $("#location_access").click(function(){
    initMap();
  })
});

var global_profile_info;
onSignInCallback();

  /**
   * Handler for the signin callback triggered after the user selects an account.
   */
      function onSignInCallback(resp) {
        hide_content();
       

        gapi.client.load('plus','v1', function(){
         var request = gapi.client.plus.people.get({
           'userId': 'me'
         });
         request.execute(function(resp) {
          global_profile_info = resp
          console.log(global_profile_info)
           console.log('Retrieved profile for:' + resp.displayName);
           $("#user_name, #name").text(resp.displayName);
           $("#user_name, #name").text(resp.displayName);
           $("#user_name").attr('href',resp.url);
           $("#user_profile").show();
           $("#user_profile").attr('src',resp.image.url);
           var url = resp.image.url.split('?');
           $("#img_profile").attr('src',url[0]);
           $("#profile_id").text(resp.id);
           $("#gender").text(resp.gender);
           $("#email").text(resp.emails[0].value);
         
         });
    });

  }
    

  /**
   * Sets up an API call after the Google API client loads.
   */
  function apiClientLoaded() {
    gapi.client.plus.people.get({userId: 'me'}).execute(handleEmailResponse);
  }

  function handleEmailResponse(resp) {
    var primaryEmail;
    for (var i=0; i < resp.emails.length; i++) {
      if (resp.emails[i].type === 'account') primaryEmail = resp.emails[i].value;
    }
    document.getElementById('responseContainer').value = 'Primary email: ' +
        primaryEmail + '\n\nFull Response:\n' + JSON.stringify(resp);
  }

var map;
var infowindow;
var pyrmont;

function initMap() {

   if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
function showPosition(position) {
     pyrmont = {lat: position.coords.latitude, lng: position.coords.longitude};
}

  console.log(pyrmont.lat)
  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 16
  });

  infowindow = new google.maps.InfoWindow();

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    types: ['restaurant']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      console.log(results[i])
      createMarker(results[i]);

      $("#Location_name").append("<li id=detail_"+i+">"+results[i].name+"<br/>"+results[i].vicinity+"</li>");
     // $("#detail"+i).append("<div>"+results[i].type+"</div>");

    }
  }
}

function createMarker(place) {
  /*store*/
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


google.maps.event.addDomListener(window, 'load', initialize);


function initAutocomplete() {
    $("#user_profile").hide();
    setInterval(function(){
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $("#current_time").text(time);
    },100);

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.866, lng: 151.196},
        streetViewControl: true,
        zoom: 14,
        styles: [{
        stylers: [{
            visibility: 'simplified'
        }]
        }, {
            elementType: 'labels',
            stylers: [{
                visibility: 'on'
            }]
        }]
    });

   // var service = new google.maps.places.PlacesService(map);


    var infoWindow = new google.maps.InfoWindow({
        map: map
    });

    map.addListener('idle', performSearch);
    // Try HTML5 geolocation.
 
    var lat;
    var long;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            lat = pos.lat;
            long = pos.lng;
            infoWindow.setContent('<div id="place_name"></div>');


             var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
               +lat+","+long+"&sensor=true";
            $.get(url).success(function(data) {
               var loc1 = data.results[0];
               var county, city;
                 $.each(loc1, function(k1,v1) {
                    if (k1 == "address_components") {
                       for (var i = 0; i < v1.length; i++) {
                          for (k2 in v1[i]) {
                             if (k2 == "types") {
                                var types = v1[i][k2];
                                if (types[0] =="sublocality_level_1") {
                                    county = v1[i].long_name;
                                    //alert ("county: " + county);
                                } 
                                if (types[0] =="locality") {
                                   city = v1[i].long_name;
                               } 
                             }
                          }          
                       }
                    }
                 });

                 $('#city').html(city); 
                 $("#place_name").html(city);
            });



        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var rest_input = document.getElementById('resturant-input');
    var searchBoxRestro = new google.maps.places.SearchBox(rest_input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(rest_input);

    var markers = [];

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });


    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
         var service = new google.maps.places.PlacesService(map);

        var bounds = new google.maps.LatLngBounds();
         var placesList = document.getElementById('places');

        places.forEach(function(place) {
            autocomplete.addListener('place_changed', function() {

              infowindow.close();
              var place = autocomplete.getPlace();
              if (!place.geometry) {
                return;
              }

              if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
              } else {
                map.setZoom(15);
              }

              // Set the position of the marker using the place ID and location.
              marker.setPlace({
                placeId: place.name,
                location: place.geometry.location
              });
              marker.setVisible(true);
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>'+
                  place.formatted_address);
                  infowindow.open(map, marker);
            });
        });
        map.fitBounds(bounds);
    });
}
