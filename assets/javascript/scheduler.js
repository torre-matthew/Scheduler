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
  let firstTrainTime = "";
  let minsAway = "";

  $(".submit-form").on("click", function (event) {

    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    firstTrainTime = $("#time-input").val().trim();
    
    
    let momentFirstTrainTime = moment(firstTrainTime, "hh:mm A");
    let minsBetweenFirstTimeAndNow = moment().diff(momentFirstTrainTime, "minutes");
    let runs = Math.floor(minsBetweenFirstTimeAndNow/frequency);
    let nextArrival = momentFirstTrainTime.add(runs*frequency, "m");
    let minsAway = nextArrival.diff(moment(), "minutes");

    if (minsAway < 0) {
        nextArrival.add(frequency, "m");
        console.log(nextArrival.format("hh:mm A"));
        minsAway = nextArrival.diff(moment(), "minutes");
        console.log(minsAway);

    }

    dbRef.ref().push({
        train: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    });

    // console.log("How time is displaying " + momentFirstTrainTime.format("hh:mm A"));

    function nextArrivalDisplayLogic () {
        
        
    }

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");

  });

  dbRef.ref().on("child_added", function (newEntrySnapshot) {
    // console.log(newEntrySnapshot.val().train);
    // console.log(newEntrySnapshot.val().destination);
    // console.log(newEntrySnapshot.val().firstTrainTime);
    // console.log(newEntrySnapshot.val().frequency);


    $("tbody").append("<tr><td>" + newEntrySnapshot.val().train + "</td><td>" + newEntrySnapshot.val().destination + "</td><td>" + newEntrySnapshot.val().frequency + "</td><td>" + newEntrySnapshot.val().nextArrival + "</td></tr>");

  });

