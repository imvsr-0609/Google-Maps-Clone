  mapboxgl.accessToken = 'pk.eyJ1IjoiaW12c3IiLCJhIjoiY2tqMXNhdTlzNHhpYTJzbGJ0cDYzYmVieCJ9.tbKK3i1hFUgvxmKvlPgcKA';

  navigator.geolocation.getCurrentPosition(successLocation, errorLocation , {enableHighAccuracy:true})

  function successLocation(position){
      console.log(position)
      setupMap([position.coords.longitude,position.coords.latitude])

  }

  function errorLocation(){
      setupMap([-64.7505,32.3078])
  }

  function setupMap(center){
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 15
      });

      map.on('load', function () {
        map.loadImage(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Pin_point_location_SVG_black.svg/200px-Pin_point_location_SVG_black.svg.png',
        function (error, image) {
        if (error) throw error;
        map.addImage('pin', image);
        map.addSource('point', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
        {
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': center
        }
        }
        ]
        }
        });
        map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point',
        'layout': {
        'icon-image': 'pin',
        'icon-size': 0.1
        }
        });
        }
        );
        });
     
      map.addControl(new mapboxgl.NavigationControl());
      var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
      });
        
      map.addControl(directions, 'top-left');
  }

