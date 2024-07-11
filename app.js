// Set the Cesium Ion access token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWFiYTk2YS05ODNjLTRhOGMtYjAxMi1hZTZlNTBiZjhhNjciLCJpZCI6MjIwMjE2LCJpYXQiOjE3MTc1Nzc1MjZ9.YlTuNHJxUCMwExzJ6lFkXv2whLH8llfgBtPSBtCpzFE';

// Initialize the Cesium Viewer
var viewer = new Cesium.Viewer('cesiumContainer');

// Create a ScreenSpaceEventHandler
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

// Set up the click event handler
handler.setInputAction(function (movement) {
    // Get the Cartesian coordinates of the click position
    var cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
    if (cartesian) {
        // Convert Cartesian to Cartographic coordinates
        var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian);
        // Convert radians to degrees
        var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        
        // Log the coordinates
        console.log('Latitude: ' + latitude + ', Longitude: ' + longitude);

        // Call function to fetch weather data
        fetchWeather(latitude, longitude);
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// Function to fetch weather data from OpenWeatherMap API
function fetchWeather(latitude, longitude) {
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    var apiKey = 'caaac98117c437a75e94f48234607119';
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display weather information on the console
            console.log('Weather:', data);
            // Example: Display temperature in Celsius
            console.log('Temperature:', data.main.temp, '°C');
            // Example: Display weather description
            console.log('Description:', data.weather[0].description);

            // Display weather information on the webpage
            var weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `
                <h2>Weather Information</h2>
                <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><strong>Description:</strong> ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

