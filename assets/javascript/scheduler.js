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
  let carName = "";
  let destination = "";
  let frequency = "";
  let firstCarTime = "";
  let minsAway = "";
  let nextArrival = "";

  //When the form in the modal is submitted, "push" data to the firebase db. Also, add values that live in the databse (not calculated) to the page.
  $(".submit-form").on("click", function (event) {

    carName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    firstCarTime = $("#time-input").val().trim();
    
    dbRef.ref().push({
        car: carName,
        destination: destination,
        frequency: frequency,
        firstCarTime: firstCarTime
    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");
        

  });

  //Logic for calculating First Arrival time and mins away based on values sotred in the db.
  function timeCalc () {
    
    let momentFirstTrainTime = moment(firstCarTime, "hh:mm A");
    let minsBetweenFirstTimeAndNow = moment().diff(momentFirstTrainTime, "minutes");
    let runs = Math.floor(minsBetweenFirstTimeAndNow/frequency);
        nextArrival = momentFirstTrainTime.add(runs*frequency, "m");
        minsAway = nextArrival.diff(moment(), "minutes");

    // If minsAway has passed, calculate the minsAway for the next Arrival time.
    if (minsAway < 0) {
        nextArrival = nextArrival.add(frequency, "m");
        minsAway = nextArrival.diff(moment(), "minutes");
    } 
    
    // If car is arriving now, say so!
    if (minsAway === 0) {
        minsAway = "Ariving Now";
    }
  }

  //Whenever new values are added to the db and on first page load, display what exists in the database at that time and calculate the necessary values based on that data.
  dbRef.ref().on("child_added", function (newEntrySnapshot) {
    firstCarTime = newEntrySnapshot.val().firstCarTime; 
    frequency = newEntrySnapshot.val().frequency;

    timeCalc ();

    nextArrival = nextArrival.format("hh:mm A");


    $("tbody").append("<tr><td>" + 
        newEntrySnapshot.val().car + 
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

