var firebaseConfig = {
  apiKey: "AIzaSyDViSf5lD1oGz9kW7dZJqeJ8x85_jNd_-0",
  authDomain: "train-tracker-7104f.firebaseapp.com",
  databaseURL: "https://train-tracker-7104f.firebaseio.com",
  projectId: "train-tracker-7104f",
  storageBucket: "",
  messagingSenderId: "807202456056",
  appId: "1:807202456056:web:52f36c92147577e178560d"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTime = moment($("#first-time-input").val().trim(),"HH:mm").format("LT");
  
  var frequency = $("#frequency-input").val().trim();

  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
  };

   // Uploads employee data to the database
   database.ref().push(newTrain);

    // Logs everything to console
  // console.log(newTrain.trainName);
  // console.log(newTrain.destination);
  // console.log(newTrain.firstTime);
  // console.log(newTrain.frequency);

  // alert("New Train Added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});


database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  // console.log(trainName);
  // console.log(destination);
  // console.log(firstTime);
  // console.log(frequency);

    // // Prettify the employee start
    // var nextArrival = moment.unix(empStart).format("HH:mm");

    // // Calculate the next Arrival
    var nextArrival = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate minutes Away
    // var minutesAway = empMonths * empRate;
    // console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      // $("<td>").text(nextArrival),
      // $("<td>").text(minutesAway),
    );

      // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});