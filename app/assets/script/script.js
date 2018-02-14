var locationForm = document.getElementById('location-form');
locationForm.addEventListener('submit', geocode);


function geocode(e) {
    e.preventDefault();
    var place = document.getElementById('location-input').value;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: place,
                key: 'AIzaSyDzJw3AYBJUg2-0HBx6sgxeHHoF4jex0bY'
            }
        })
        .then(function(response) {
            // Grabbing Full Address
            var formattedAddress = response.data.results[0].formatted_address;
            var formattedAddresoutput = `
            <ul class="list-group">
                <li class="list-group-item">${formattedAddress}</li>
                </ul>
            `;
            //Grabing Address Components such as street name, Country etc
            var addressDescription = response.data.results[0].address_components;
            var addressDescriptionOputput = '<ul class="list-group">';
            for (var i = 0; i < addressDescription.length; i++) {
                addressDescriptionOputput += `
                <li class="list-group-item"> <strong>${addressDescription[i].types[0]}</strong>
                :${addressDescription[i].long_name} </li>
                `;
            }
            addressDescriptionOputput += '</ul>';
            //Grabbing latitude and longitude of specified location
            var lat = response.data.results[0].geometry.location.lat;
            var lng = response.data.results[0].geometry.location.lng;
            var geometryOutput = `
            <ul class="list-group">
                <li class="list-group-item"><strong>Latitude :</strong>${lat}</li>
                <li class="list-group-item"><strong>Longitude :</strong>${lng}</li>
                
             `;

            // Manipulating DOM to display Grabbed Elements
            document.getElementById('place').innerHTML = formattedAddresoutput;
            document.getElementById('area').innerHTML = addressDescriptionOputput;
            document.getElementById('latlng').innerHTML = geometryOutput;

            initMap(lat, lng); // passing latitude and longitude to Google Maps JavaScript API function.

        })
        .catch(function(error) {
            console.log(error);
        })
};

//Google Maps API
function initMap(horiz, vert) {

    var uluru = { lat: horiz, lng: vert };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: horiz, lng: vert },
    });
    var marker = new google.maps.Marker({
        position: { lat: horiz, lng: vert },
        map: map
    });
}