// @ts-nocheck
// need the following global variables Train name, Destination, Fequency in minutes, next arrival time, and minutes away
// load the page with a few existing routes
// will need precreated train routes in firebase that load when the page loads
// calculte next arrival time
// calculate minutes away
// Required for side-effects

var firebaseConfig = {
    apiKey: "AIzaSyB5zkjPTz_JVKbi3im80Z7eLMsOjZ5BFbM",
    authDomain: "train-schedule-88e3a.firebaseapp.com",
    databaseURL: "https://train-schedule-88e3a.firebaseio.com",
    projectId: "train-schedule-88e3a",
    storageBucket: "train-schedule-88e3a.appspot.com",
    messagingSenderId: "347543838637",
    appId: "1:347543838637:web:d98f060022851b379a8b24"
};
// Initialize Firebase
firebase.initializeApp( firebaseConfig );





var database = firebase.database()
var tName = "";
var tdest = "";
var tfreq = 0;
var first = 0;
var arrival = 0;
var away = 0;


// retrive Trains from the database on page load
database.ref().on( 'child_added', function ( childsnapshot )
{
    let tName = childsnapshot.val().trainName;
    let tdest = childsnapshot.val().destination;
    let tfreq = childsnapshot.val().frequency;
    let first = childsnapshot.val().first;

    let nRow = $( '<tr>' ).attr( 'scope', "row" );
    let td1 = $( '<td>' ).text( tName );
    let td2 = $( '<td>' ).text( tdest );
    let td3 = $( '<td>' ).text( tfreq );
    let td4 = $( '<td>' ).text( arrival );
    let td5 = $( '<td>' ).text( away );

    nRow.append( td1, td2, td3, td4, td5 )
    $( '#row' ).append( nRow )







} )









// on add button click grab values and add to the database

$( '#add' ).on( 'click', function ( event )
{
    event.preventDefault();

    // Get values from the input

    let tName = $( '#tname' ).val();
    let tdest = $( '#tdest' ).val();
    let tfreq = $( '#freq' ).val();
    let first = $( '#ltime' ).val();


    // consolelog output

    console.log( "Name: " + tName );
    console.log( "Destination: " + tdest );
    console.log( "Frequency: " + tfreq );
    console.log( "Time to go: " + first );



    // push to the database

    database.ref().push( {

        trainName: tName,
        destination: tdest,
        frequency: tfreq,
        first: first,


    } )



} )