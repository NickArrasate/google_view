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
      console.log(data);
      p[0].setPano(data.location.pano);
    } else {
      setRandomLocation(p)
      console.log("no street view");
    }
  });

}

$(function() {
  GoogleMapsLoader.load(function(google) {
    var panos = [];
    for (var i = 0; i < 9; i++) {
      newPano = new google.maps.StreetViewPanorama(
        document.getElementById('pano' + i), {
          pov: {
            heading: 0,
            pitch: 90
          },
        });
        setRandomLocation([newPano]);
        panos.push(newPano);
    }
    console.log(panos)

    setInterval(function() {
      panos.forEach(function(e) {
        e.setPov({
          heading: e.pov.heading +=1,
          pitch: e.pov.pitch
        });
      })
    }, 300)

    setInterval(function() {
      for (var i = 0; i < panos.length; i++) {
        setRandomLocation([panos[i]]);
        $("#pano" + i + " p").text(panos[i].location.description);
      }
    }, 10000)

  });
});
