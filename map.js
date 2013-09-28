var geocoder;
function showMap() {
geocoder = new google.maps.Geocoder();
var latlng = new google.maps.LatLng(40.7588711, -73.98511380000002);
var mapOptions = {
center: latlng,
zoom: 18,                        // set the zoom level manually
zoomControl: false,
scaleControl: false,
scrollwheel: false,
disableDoubleClickZoom: true,
scrollwheel: false,
navigationControl: false,
mapTypeControl: false,
scaleControl: false,
draggable: true,
mapTypeId: google.maps.MapTypeId.ROADMAP
}
map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

var drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.MARKER,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.MARKER,
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.POLYLINE,
              google.maps.drawing.OverlayType.RECTANGLE
            ]
          },
          markerOptions: {
            icon: 'images/beachflag.png'
          },
          circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1
          }
        });
        drawingManager.setMap(map);
}
function codeAddress() {
var houseNumber= $('#houseNumber').val();
var streetAddress = $('#address').val();
var borough = $('#borough').val();
var address = houseNumber + " " + streetAddress + " " + borough + " New York";
geocoder.geocode( { 'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
map.setCenter(results[0].geometry.location);
var marker = new google.maps.Marker({
map: map,
position: results[0].geometry.location
});
} else {
alert('Please Enter a valid address! ');
}
});
}
function codeAddress() {
var houseNumber= $('#houseNumber').val();
var streetAddress = $('#address').val();
var borough = $('#borough').val();
var address = houseNumber + " " + streetAddress + " " + borough + " New York";
geocoder.geocode( { 'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
map.setCenter(results[0].geometry.location);
var marker = new google.maps.Marker({
map: map,
position: results[0].geometry.location
});
} else {
alert('Please Enter a valid address! ');
}
var drawingManager = new google.maps.drawing.DrawingManager({
  drawingMode: google.maps.drawing.OverlayType.MARKER,
  drawingControl: true,
  drawingControlOptions: {
    position: google.maps.ControlPosition.TOP_CENTER,
    drawingModes: [
      google.maps.drawing.OverlayType.MARKER,
      google.maps.drawing.OverlayType.CIRCLE,
      google.maps.drawing.OverlayType.POLYGON,
      google.maps.drawing.OverlayType.POLYLINE,
      google.maps.drawing.OverlayType.RECTANGLE
    ]
  },
  markerOptions: {
    icon: 'http://www.example.com/icon.png'
  },
  circleOptions: {
    fillColor: '#ffff00',
    fillOpacity: 1,
    strokeWeight: 5,
    clickable: false,
    zIndex: 1,
    editable: true
  }
});
drawingManager.setMap(map);
});
}
