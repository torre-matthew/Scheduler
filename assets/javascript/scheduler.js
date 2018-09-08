// Initialize Firebase
let config = {
    apiKey: "AIzaSyB9O39tw5v5Ee8BWZ554fXYCHI58EuVEBQ",
    authDomain: "scheduler-d6dba.firebaseapp.com",
    databaseURL: "https://scheduler-d6dba.firebaseio.com",
    projectId: "scheduler-d6dba",
    storageBucket: "scheduler-d6dba.appspot.com",
    messagingSenderId: "227560304863"
  };
  firebase.initializeApp(config);

  let dbRef = firebase.database();
  let trainName = "";
  let destination = "";
  let frequency = "";
  let nextArrival = "";
  let minsAway = "";

  $(".submit-form").on("click", function (event) {

    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    nextArrival = $("#time-input").val().trim();
        console.log(trainName);
        console.log(destination);
        console.log(nextArrival);
        console.log(frequency); 

    dbRef.ref().push({
        train: trainName,
        destination: destination,
        nextArrival: nextArrival,
        frequency: frequency,
    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");

  });

