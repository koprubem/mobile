const functions = require('firebase-functions');  
const admin = require('firebase-admin');  
admin.initializeApp();  

exports.sendNewTripNotification = functions.database.ref('/users/userid/').onUpdate(event=>{
    const uuid = event.params.uid;

    console.log('User to send notification', uuid);

    var ref = admin.database().ref('users/${uuid}/token');
    return ref.once("value", function(snapshot){
         const payload = {
              notification: {
                  title: 'You have been invited to a trip.',
                  body: 'Tap here to check it out!'
              }
         };

         admin.messaging().sendToDevice(snapshot.val(), payload)

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
