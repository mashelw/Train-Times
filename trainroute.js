$(document).ready(function(){

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyD8lrj8aGchGfbtIJGJkVC5R3p7ypYV9S8",
    authDomain: "train-times-5da48.firebaseapp.com",
    databaseURL: "https://train-times-5da48.firebaseio.com",
    projectId: "train-times-5da48",
    storageBucket: "",
    messagingSenderId: "348791746988"
};

firebase.initializeApp(config);

var database = firebase.database();



$('#submit-button').on('click', function(){
  event.preventDefault();
  var trainName = $('#train-route').val().trim();
  var destination = $('#train-destination').val().trim();
  var firstTrain = moment($("#train-start").val().trim(), "HH:mm").subtract(10, "years").format("X"); 
  var frequency = $('#train-frequency').val().trim();


database.ref().push({
  name: trainName,
  destination: destination,
  initalTrain: firstTrain,
  frequency: frequency,
  startedAt : firebase.database.ServerValue.TIMESTAMP
})

  console.log(snapshot.val().name);
  console.log(snapshot.val().destination);
  console.log(initalTrain);
  console.log(snapshot.val().frequency);

  $("#train-name").val("");
  $("#destination").val("");
  $("first-arrival").val("");
  $("#frequency").val("");


database.ref().on("child_added", function(snapshot){

  console.log(snapshot.val());
  
  //Display all user given inputs (train name, destination, frequency)
  var trainInfo = $('<tr>');

  var displayName = $('<td>').append(snapshot.val().name);
  var displayDestination = $('<td>').append(snapshot.val().destination);
  var displayFrequency = $('<td>').append(snapshot.val().frequency);
  var initalTrain = snapshot.val().initalTrain;

 
  var timeDiff = moment().diff(moment.unix(initalTrain), "minutes");
  var timeLeft = moment().diff(moment.unix(initalTrain), "minutes") % (snapshot.val().frequency);
  
  var minutes = (snapshot.val().frequency) - timeLeft;
  var nextArrival = moment().add(minutes, "m").format("hh:mm A"); 

  var displayArrival = $('<td>').append(nextArrival);
  var displayMinutes = $('<td>').append(minutes);


  trainInfo.append(displayName, displayDestination, displayFrequency, displayArrival, displayMinutes);
  $('#train-list').append(trainInfo);

}, function(err){
  console.log("Errors: " + err.code);
  //alert(err.code)
  });

clear();


});



