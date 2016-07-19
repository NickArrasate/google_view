var GoogleMapsLoader = require('google-maps'); // only for common js environments
GoogleMapsLoader.KEY = require('./../.env').mapsApiKey;

randRange = function(min, max) {
  return Math.random() * (max - min) + min;
};

setRandomLocation = function(p) {
  var svs = new google.maps.StreetViewService();
  var radius = 100;
  var latLng = {
    lat: randRange(48.845257, 29.787404),
    lng: randRange(-124.849915, -66.721404)
  };
  svs.getPanorama({
    location: latLng,
    radius: radius
  }, function(data, status) {
    if (status === google.maps.StreetViewStatus.OK) {
      p[0].setPano(data.location.pano);
    } else {
      setRandomLocation(p)
    }
  });

}

$(function() {
  GoogleMapsLoader.load(function(google) {
    var panos = [];
    for (var i = 0; i < 6; i++) {
      newPano = new google.maps.StreetViewPanorama(
        document.getElementById('pano' + i), {
          pov: {
            heading: 0,
            pitch: 0
          },
        });
        setRandomLocation([newPano]);
        panos.push(newPano);
    }
    console.log(panos)

    setInterval(function() {
      for (var i = 0; i < panos.length; i++) {
        setRandomLocation([panos[i]]);
        $("#pano" + i + " p").text(panos[i].location.description);
      }
    }, 10000)

  });
});
