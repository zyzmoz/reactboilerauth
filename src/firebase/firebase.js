import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCowZ59Ms9TjrDru1Tz40e8fh2KtlHZlFo",
    authDomain: "goal-coach-953d0.firebaseapp.com",
    databaseURL: "https://goal-coach-953d0.firebaseio.com",
    projectId: "goal-coach-953d0",
    storageBucket: "goal-coach-953d0.appspot.com",
    messagingSenderId: "41868907638"
};

//initialize firebase
if (!firebase.apps.length){
    firebase.initializeApp(config);
};

const auth = firebase.auth();
const db = firebase.database();

export {
    auth,
    db,
}