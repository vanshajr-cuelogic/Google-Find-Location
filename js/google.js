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

var global_profile_info;
onSignInCallback();


  /**
   * Handler for the signin callback triggered after the user selects an account.
   */
      function onSignInCallback(resp) {
        gapi.client.load('plus','v1', function(){
         var request = gapi.client.plus.people.get({
           'userId': 'me'
         });
         request.execute(function(resp) {
          global_profile_info = resp
          console.log(global_profile_info)
           console.log('Retrieved profile for:' + resp.displayName);
           $("#user_name").text(resp.displayName)
           $("#user_name").attr('href',resp.url)
           $("#user_profile").show();
           $("#user_profile").attr('src',resp.image.url);
         
         });
    });

  }
    

  /**
   * Sets up an API call after the Google API client loads.
   */
  function apiClientLoaded() {
    gapi.client.plus.people.get({userId: 'me'}).execute(handleEmailResponse);
  }

  /**
   * Response callback for when the API client receives a response.
   *
   * @param resp The API response object with the user email and profile information.
   */
  function handleEmailResponse(resp) {
    var primaryEmail;
    for (var i=0; i < resp.emails.length; i++) {
      if (resp.emails[i].type === 'account') primaryEmail = resp.emails[i].value;
    }
    document.getElementById('responseContainer').value = 'Primary email: ' +
        primaryEmail + '\n\nFull Response:\n' + JSON.stringify(resp);
  }



function initAutocomplete() {
    $("#user_profile").hide();
    setInterval(function(){
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $("#current_time").text(time);
    },100);

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -20.397,
            lng: 150.644
        },
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
            infoWindow.setContent("Loc");


             var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
               +lat+","+long+"&sensor=false";
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
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var rest_input = document.getElementById('resturant-input');
    var searchBoxRestro = new google.maps.places.SearchBox(rest_input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(rest_input);

    var markers = [];

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
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(80, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}
