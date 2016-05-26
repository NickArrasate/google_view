var mapsApiKey = require('./../.env').mapsApiKey;
var GoogleMapsLoader = require('google-maps'); // only for common js environments
GoogleMapsLoader.KEY = mapsApiKey;


$(function() {
  var heading = 0;
  var pitch = 90;

  GoogleMapsLoader.load(function(google) {
    var pano = new google.maps.StreetViewPanorama(
      document.getElementById('map'), {
        pov: {
          heading: heading,
          pitch: pitch
        },
        disableDefaultUI: true
      });
    randomLocation();


    setInterval(function() {
      randomLocation();
    }, 5000)

    setInterval(function() {
      heading += .1;
      pano.setPov({
        heading: heading,
        pitch: pitch
      });
    }, 1)


    function randomLocation() {
      var svs = new google.maps.StreetViewService();
      var latLng = new google.maps.LatLng(Math.random() * 180 - 90, Math.random() * 360 - 180);
      svs.getPanorama({
        location: latLng,
        radius: 1000000
      }, function(data, status) {
        if (status === google.maps.StreetViewStatus.OK) {
          console.log(data);
          pano.setPano(data.location.pano);
        } else {
          console.log("no street view");
          randomLocation();
        }
      });
    }

  });
});
