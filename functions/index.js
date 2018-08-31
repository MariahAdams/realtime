const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.database();
const playersRef = db.ref('players');
const gamesRef = db.ref('games');
const userGamesRef = db.ref('userGames');
const movesRef = db.ref('moves');

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

  const gameMovesRef = movesRef.child(gameKey);

  return gameMovesRef.once('value')
    .then(snapshot => {
      const game = snapshot.val();
      const moves = Object.keys(game)
        .map(key => ({
          uid: key,
          move: game[key]
        }));
      if(moves.length < 2) return null; //waiting for other player to move
      
      const roundRef = gamesMovesRef.child(gameKey).child('rounds').push();

      return Promise.all([
        gamesMovesRef.remove(),
        roundRef.set({
          moves,
          winner: calculateWinner(moves)
        })
      ]);
    });
});

const calculateWinner = ([move1, move2]) => {
  if(isWinner(move1.play, move2.play)) return move1.uid;
  if(isWinner(move2.play, move1.play)) return move2.uid;
  return null;
};

const isWinner = (play1, play2) => {
  if(play1 === 'SCISSORS' && play2 === 'PAPER') return true;
  if(play1 === 'PAPER' && play2 === 'ROCK') return true;
  if(play1 === 'ROCK' && play2 === 'SCISSORS') return true;
  if(play1 === 'SCISSORS' && play2 === 'LIZARD') return true;
  if(play1 === 'LIZARD' && play2 === 'SPOCK') return true;
  if(play1 === 'SPOCK' && play2 === 'ROCK') return true;
  if(play1 === 'ROCK' && play2 === 'LIZARD') return true;
  if(play1 === 'LIZARD' && play2 === 'PAPER') return true;
  if(play1 === 'PAPER' && play2 === 'SPOCK') return true;
  if(play1 === 'SPOCK' && play2 === 'SCISSORS') return true;
  return false;
};