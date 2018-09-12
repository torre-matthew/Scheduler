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
  let nextArrival = "";

  $(".submit-form").on("click", function (event) {

    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    firstTrainTime = $("#time-input").val().trim();
    
    dbRef.ref().push({
        train: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime
    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");


        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);
        

  });

  function timeCalc () {
    
    let momentFirstTrainTime = moment(firstTrainTime, "hh:mm A");
    let minsBetweenFirstTimeAndNow = moment().diff(momentFirstTrainTime, "minutes");
    let runs = Math.floor(minsBetweenFirstTimeAndNow/frequency);
        nextArrival = momentFirstTrainTime.add(runs*frequency, "m");
        minsAway = nextArrival.diff(moment(), "minutes");

    if (minsAway < 0) {
        nextArrival = nextArrival.add(frequency, "m");
        console.log("Next Arrival Time " + nextArrival.format("hh:mm A"));
        console.log("Next Arrival Time " + nextArrival);
        minsAway = nextArrival.diff(moment(), "minutes");
        console.log("Minutes Away " + minsAway);
    } 
    
    if (minsAway === 0) {
        minsAway = "Ariving Now";
    }
  }

  dbRef.ref().on("child_added", function (newEntrySnapshot) {
    // console.log(newEntrySnapshot.val().train);
    // console.log(newEntrySnapshot.val().destination);
    console.log(newEntrySnapshot.val().firstTrainTime);
    // console.log(newEntrySnapshot.val().frequency);

    firstTrainTime = newEntrySnapshot.val().firstTrainTime; 
    frequency = newEntrySnapshot.val().frequency;

    timeCalc ();
    

    nextArrival = nextArrival.format("hh:mm A");


    $("tbody").append("<tr><td>" + 
        newEntrySnapshot.val().train + 
        "</td><td>" + 
        newEntrySnapshot.val().destination + 
        "</td><td>" + 
        newEntrySnapshot.val().frequency + 
        "</td><td>" + 
        nextArrival + 
        "</td><td>" +  
        minsAway + 
        "</td></tr>"        
    );

  });

