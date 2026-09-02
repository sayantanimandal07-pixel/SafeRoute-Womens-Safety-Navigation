// Initialize map

const map = L.map("map").setView([20.5937, 78.9629], 5);


L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            '&copy; OpenStreetMap contributors'
    }
).addTo(map);


// Variables

let selectedLat = null;
let selectedLng = null;

let reportCount = 0;

let safetyScore = 100;

let temporaryMarker = null;


// Get User Location

document
    .getElementById("locationBtn")
    .addEventListener("click", function () {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(

                function (position) {

                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;


                    // Move map

                    map.setView([lat, lng], 15);


                    // Add marker

                    L.marker([lat, lng])
                        .addTo(map)
                        .bindPopup("📍 You are here")
                        .openPopup();

                },

                function () {

                    alert(
                        "Unable to get your location. Please allow location access."
                    );

                }

            );

        } else {

            alert(
                "Geolocation is not supported by your browser."
            );

        }

    });


map.on("click", function (event) {

    selectedLat = event.latlng.lat;

    selectedLng = event.latlng.lng;


    // Remove previous temporary marker

    if (temporaryMarker) {

        map.removeLayer(temporaryMarker);

    }


    // Add new temporary marker

    temporaryMarker =
        L.marker([selectedLat, selectedLng])
            .addTo(map)
            .bindPopup("Selected unsafe location")
            .openPopup();


    // Display coordinates

    document.getElementById("selectedLocation").innerText =
        `Selected Location: ${selectedLat.toFixed(4)}, ${selectedLng.toFixed(4)}`;

});


// Submit Unsafe Location Report

document
    .getElementById("reportBtn")
    .addEventListener("click", function () {

        if (selectedLat === null || selectedLng === null) {

            alert(
                "Please select a location on the map first."
            );

            return;

        }


        const severity =
            document.getElementById("severity").value;


        let radius;

        let message;


        // Set severity

        if (severity === "low") {

            radius = 200;

            message = "⚠️ Low Risk Area";

        }

        else if (severity === "medium") {

            radius = 400;

            message = "⚠️ Medium Risk Area";

        }

        else {

            radius = 600;

            message = "🚨 High Risk Area";

        }


        // Add unsafe zone circle

        L.circle(
            [selectedLat, selectedLng],
            {
                radius: radius,
                color: "red",
                fillColor: "red",
                fillOpacity: 0.3
            }
        )
        .addTo(map)
        .bindPopup(message);


        // Update report count

        reportCount++;

        document
            .getElementById("reportCount")
            .innerText = reportCount;


        // Update safety score

        safetyScore -= 5;

        if (safetyScore < 0) {

            safetyScore = 0;

        }


        document
            .getElementById("safetyScore")
            .innerText = safetyScore;


        alert(
            "Unsafe location reported successfully!"
        );


        // Reset

        selectedLat = null;

        selectedLng = null;


        document
            .getElementById("selectedLocation")
            .innerText =
            "Click a location on the map first.";

    });
