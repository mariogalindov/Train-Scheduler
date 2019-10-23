// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD58CS5MdyRv0JdPChpZ9I98b8gpInA9v8",
    authDomain: "bootcamp-3ef0f.firebaseapp.com",
    databaseURL: "https://bootcamp-3ef0f.firebaseio.com",
    projectId: "bootcamp-3ef0f",
    storageBucket: "bootcamp-3ef0f.appspot.com",
    messagingSenderId: "59789715081",
    appId: "1:59789715081:web:a777be8ae4a289241e4858"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$( document ).ready(function() {
    $("#submitBtn").on("click", function(event){
        event.preventDefault();

        var trainNameVal = $("#trainName").val().trim();
        var destinationVal = $("#destination").val().trim();
        var firstTrainTimeVal = $("#firstTrainTime").val();
        var firstTimeFormatted = moment(firstTrainTimeVal, "HH:mm")
        var frequencyVal = $("#frequency").val();
        var time = moment().format("HH:mm");
        var diffTime = moment().diff(moment(firstTimeFormatted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        console.log(time);

        // Time apart (remainder)
        var tRemainder = diffTime % frequencyVal;
        console.log(tRemainder);

        var tMinutesTillTrain = frequencyVal - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log(nextTrain);
        nextTrainFormatted = moment(nextTrain).format("hh:mm A");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

        database.ref("/trainScheduler").push({
            dbTrain: trainNameVal,
            dbDestination: destinationVal,
            dbFrequency: frequencyVal,
            dbNextArrival: nextTrainFormatted,
            dbMinutesAway: tMinutesTillTrain,


        })

        var newRow = $("<tr>");
        var trainNameRow = $("<th>").text(trainNameVal);
        console.log(trainNameVal)

    })
});