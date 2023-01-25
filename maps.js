
initMap = () => {
    // maps options
    //  getLocation = () => {
    //         if (navigator.geolocation) {
    //             const options = {
    //                 enableHighAccuracy: true,
    //                 // timeout: 5000,
    //                 maximumAge: 0
    //             };
    //             navigator.geolocation.getCurrentPosition( successFunc, errorFunc,options);
    //         }
    //         else
    //         { x.innerHTML= "Geolocation is not supported by this browser."; }
    //  }
    //  const errorFunc = (e) =>  {
    //     console.log("error code:" + e.code + 'message: ' + e.message );
    // }
    //
    // const successFunc = (position) => {
    //     let lat = position.coords.latitude;
    //     let lng = position.coords.longitude;
    //     let myLocation = new google.maps.LatLng(lat, lng);
    // }
    //
    // let mapOptions = {
    //     center: new google.maps.LatLng(myLocation.lat(),myLocation.lng()),
    //     zoom: 13,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    let mapOptions = {
        zoom: 11,
        center: {lat: 31, lng: 34}
    }
    // new map
    let map = new google.maps.Map(document.getElementById('map'), mapOptions);


    // listen for click on map
    google.maps.event.addListener(map, 'click',
        (event) => {
            // add new marker - we need to store it in the DB.
            addMarker({coords: event.latLng});
        });
    // add marker function
    addMarker = (props) => {
        let marker = new google.maps.Marker({
            position: props.coords,
            map: map,
        });
        //check for custom icon
        if (props.icon) {
            marker.setIcon(props.icon);
        }
        if (props.content) {
            let infoWindow = new google.maps.InfoWindow({
                content: props.content
            });
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        }
    }
    // Array of markers
    const markers = [
        {
            coords: {lat: 32.0866, lng: 34.8851},
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
            content: '<h2>Peath Tikva</h2>'
        },
        {
            coords: {lat: 31.801447, lng: 34.643497},
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
            content: '<h2>Ashdod</h2>'
        },
        {
            coords: {lat: 32.068424, lng: 34.82478500000002},
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
            content: '<h2>Ramat Gan</h2>'
        }
    ]
    // loop through markers
    for (let i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }
}
// google.maps.event.addDomListener(window, 'load', getLocation() );

