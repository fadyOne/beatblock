// script.js
// Mina blockchain interaction (this is a simplified and hypothetical example)

const mina = require('mina-sdk'); // Hypothetical Mina SDK

// Connect to your smart contract
const myContract = mina.contract.connect('YOUR_CONTRACT_ADDRESS');

// Function to handle adding an artist
function addArtistToBlockchain(artistName, artistImage) {
    myContract.addArtist(artistName, artistImage).then(response => {
        console.log("Artist added to blockchain:", response);
    }).catch(error => {
        console.error("Blockchain error:", error);
    });
}
// Function to update the visibility of the 'View Event List' button
function updateViewEventsButton() {
    if (artists.length > 0 && localStorage.getItem("eventName")) {
        $("#viewEventsBtn").show();
    } else {
        $("#viewEventsBtn").hide();
    }
}
// Call this function after adding an event or an artist
$("#eventForm").submit(function(event) {
    // Existing event form submission code
    // ...
    updateViewEventsButton(); // Update button visibility
});

$("#artistForm").submit(function(event) {
    // Existing artist form submission code
    // ...
    updateViewEventsButton(); // Update button visibility
});

// Modify your existing artist form submission to include blockchain interaction
$("#artistForm").submit(function(event) {
    event.preventDefault();
    var artistName = $("#artistName").val();
    var artistImage = $("#artistImage").val();

    // Add artist to blockchain
    addArtistToBlockchain(artistName, artistImage);

    // Rest of your code...
});

$("#artistForm").submit(function(event) {
    event.preventDefault();
    var artistName = $("#artistName").val();

    // Read the image file as a data URL (Base64 string)
    var file = document.getElementById('artistImage').files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        var artistImage = reader.result; // This is the Base64 string
        // Rest of your code to handle the artist submission...
    }
    if (file) {
        reader.readAsDataURL(file);
    }
});

