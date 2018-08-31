const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.database();
const playersRef = db.ref('players');
const gamesRef = db.ref('games');
const userGamesRef = db.ref('userGames');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.playerQueue = functions.database.ref('/players/{uid}').onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const { uid } = context.params;

  return playersRef.once('value')
    .then(snapshot => {
      const [player] = Object.keys(snapshot.val())
        .filter(key => key !== uid);

      if(!player) return null;

      const newGameRef = gamesRef.push();
      
      return Promise.all([
        newGameRef.set({ player1: uid, player2: player }),
        playersRef.child(uid).remove(),
        playersRef.child(player).remove(),
        userGamesRef.child(uid).child(newGameRef.key).set(true),
        userGamesRef.child(player).child(newGameRef.key).set(true)
      ]);

    });
});

exports.moveQueue = functions.database.ref('/moves/{gameKey}/{uid}').onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const { gameKey, uid } = context.params;

  const gameRef = snapshot.ref.parent;
});