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

        database.ref("/trainScheduler").push({
            dbTrain: trainNameVal,
            dbDestination: destinationVal,
            dbFrequency: frequencyVal,
            // dbNextArrival: nextTrainFormatted,
            dbFirstTime: firstTrainTimeVal,
        });

        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrainTime").val("");
        $("#frequency").val("");

    });

    database.ref("/trainScheduler").on("child_added", function(snapshot){
        var snap = snapshot.val();
        var firstTimeFormatted = moment(snap.dbFirstTime, "HH:mm");
        console.log(firstTimeFormatted);
        var diffTime = moment().diff(moment(firstTimeFormatted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % snap.dbFrequency;
        console.log(tRemainder);

        var tMinutesTillTrain = snap.dbFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log(nextTrain);
        nextTrainFormatted = moment(nextTrain).format("hh:mm A");

        var tName = snap.dbTrain;
        var tDestination = snap.dbDestination;
        var tFrequency = snap.dbFrequency;
        var tNextArrival = nextTrainFormatted;
        var tMinutesAway = snap.dbMinutesAway;

        var newTR = $("<tr>");
        var trainTD = $("<th>").text(snapshot.val().dbTrain);
        var destinationTD =$("<td>").text(tDestination);
        var frequencyTD = $("<td>").text(tFrequency);
        var nextArrivalTD = $("<td>").text(tNextArrival);
        var minutesAwayTD = $("<td>").text(tMinutesTillTrain);

        newTR.append(trainTD);
        newTR.append(destinationTD);
        newTR.append(frequencyTD);
        newTR.append(nextArrivalTD);
        newTR.append(minutesAwayTD);

        $("tbody").append(newTR);

    });
});