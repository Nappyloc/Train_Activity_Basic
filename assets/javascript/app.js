
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
// @ts-ignore
firebase.initializeApp( firebaseConfig );




// Global Variables
// @ts-ignore
var database = firebase.database()
var tName = "";
var tdest = "";
var tfreq = 0;
var first = 0;
var arrival = 0;
var mAway = 0;


//  minutes away difference between the time(now) and  first



// retrive Trains from the database on page load
database.ref().on( 'child_added', function ( childsnapshot )
{

    // retrieve previously input trains from the database
    let tName = childsnapshot.val().trainName;
    let tdest = childsnapshot.val().destination;
    let tfreq = childsnapshot.val().frequency;
    let first = childsnapshot.val().first;


    // Time Calculation for Next Arrival
    // @ts-ignore
    let timeLeft = moment().diff( moment.unix( parseInt( first ) ), "minutes" ) % tfreq;
    console.log( timeLeft );
    let mAway = tfreq - timeLeft;

    // Time Calculation for Minutes Away
    // @ts-ignore
    let arrival = moment().add( mAway, 'm' ).format( 'hh:mm A' )




    // create the virtual table row and the table content
    let nRow = $( '<tr>' ).attr( 'scope', "row" );
    let td1 = $( '<th>' ).text( tName );
    let td2 = $( '<td>' ).text( tdest );
    let td3 = $( '<td>' ).text( 'Every ' + tfreq + ' Minutes' );
    let td4 = $( '<td>' ).text( arrival );
    let td5 = $( '<td>' ).text( mAway );

    // Put the table row together
    nRow.append( td1, td2, td3, td4, td5 )

    // Add the table row to the DOM
    $( '#row' ).append( nRow )



} )









// on add button click grab values and add to the database

$( '#add' ).on( 'click', function ( event )
{
    event.preventDefault();

    // Get user values from the input

    let tName = $( '#tname' ).val();
    let tdest = $( '#tdest' ).val();
    let tfreq = $( '#freq' ).val();
    let first = $( '#ltime' ).val();


    // consolelog output

    console.log( "Name: " + tName );
    console.log( "Destination: " + tdest );
    console.log( "Frequency: " + tfreq );
    console.log( "Time to go: " + first );



    // push the values to the database

    database.ref().push( {

        trainName: tName,
        destination: tdest,
        frequency: tfreq,
        first: first,


    } )



} )