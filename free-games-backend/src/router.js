var express = require('express')
var router = express.Router()
const fetch = require('node-fetch')
const admin = require('./config/firebaseConfig');
// Firebase starter code appears below
let db = admin.firestore();
const collectionRef = db.collection('games_collection'); // Firebase collection reference object

// Currently unused because only need to call once to put data into Firestore
async function fetchData() {
  try {
    // Fetch data from third-party API
    const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f1ec4b62f9msh2e62ad7be6943c7p194559jsnbadef1473d31',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    })
    const data = await res.json();

    // Adds each item (game) from the dataset into a separate document, each document containing a single game
    for (let i = 0; i < data.length; i++) {
      // .add returns a document reference object, which we do not need to keep reference of since we're just adding data to the Firestore
      await db.collection('games_collection').add(data[i]);
    }
  }
  catch (error) {
    console.error(error);
  }
}
// Only need to call once to put data into Firestore, so it is commented out since the data are all already currently in Firestore
// fetchData();

router.get('/genre/:genre', async (req, res) => {
  // Returns a list of games based on genre
  const params = req.params;
  const genre = params['genre']; // Route parameter
  let gamesList = [];

  collectionRef.get().then((snapshot) => {
    // For each document in the collection
    snapshot.forEach((doc) => {
      // If the genre of the game matches the route parameter's genre, add the game to the list
      if (doc.data().genre.toLowerCase() === genre.toLowerCase()) {
        gamesList.push(doc.data()); // Add game into the list
      }
    })

    if (gamesList.length !== 0) { // If the list of games based on genre is not empty
      return res.status(200).json(gamesList);
    }
    return res.status(204).json({}); // Else returns status 204 (No Content) and empty json

  }).catch((error) => {
    console.error('Failed to retrieve the document(s): ', error);
  })

  // console.log(gamesList.length); // 0 because gamesList cannot be read here on this line
})


router.get('/year/:year', (req, res) => {
  // Returns list of games based on released year
  const params = req.params;
  const year = params['year']; // Route parameter
  let gamesList = []; // List of games based on released year

  collectionRef.get().then((snapshot) => {
    // For each document in the collection
    snapshot.forEach((doc) => {
      if (doc.data().release_date.includes(year)) {
        gamesList.push(doc.data()); // Add game into the list
      }
    })

    if (gamesList.length !== 0) { // If list of games based on released year is not empty
      return res.status(200).json(gamesList);
    }
    else {
      return res.status(204).json({}); // Else returns status 204 (No Content) and empty json
    }

  }).catch((error) => {
    console.error('Failed to retrieve the document(s): ', error);
  })

  // console.log(gamesList.length); // 0 because gamesList cannot be read here on this line
})


router.get('/urls', (req, res) => {
  // Returns a list of urls of all games
  let url_list = [];

  collectionRef.get().then((snapshot) => {
    // For each document in the collection
    snapshot.forEach((doc) => {
      url_list.push(doc.data().game_url); // Add game url into list
    })
    if (url_list.length !== 0) { // If list of urls is not empty (retrieval of documents was successful)
      return res.status(200).json(url_list);
    }
  }).catch((error) => {
    console.error('Failed to retrieve the document(s): ', error);
  })

  // console.log(url_list.length); // 0 because url_list cannot be read here on this line
})

router.get('/description', (req, res) => {
  // Returns a list of games
  let descriptions = [];

  collectionRef.get().then((snapshot) => {
    // For each document in the collection
    snapshot.forEach((doc) => {
      descriptions.push(doc.data()); // Add game into list
    })
    if (descriptions.length !== 0) { // If list is not empty (retrieval of documents was successful)
      return res.status(200).json(descriptions);
    }
  }).catch((error) => {
    console.error('Failed to retrieve the document(s): ', error);
  })
})

router.get('/PC', (req, res) => {
  // Returns a list containing the titles of all games on PC
  let gamesList = [];

  collectionRef.get().then((snapshot) => {
    // For each document in the collection
    snapshot.forEach((doc) => {
      if (doc.data().platform.toLowerCase().includes("pc")) {
        gamesList.push(doc.data().title); // Add title of game into the list
      }
    })
    if (gamesList.length !== 0) { // If list is not empty (retrieval of documents was successful)
      return res.status(200).json(gamesList);
    }
  }).catch((error) => {
    console.error('Failed to retrieve the document(s): ', error);
  })
})


router.get('/Browser', (req, res) => {
  // Returns a list containing the titles of all games on Browser
  let gamesList = [];

  collectionRef.get().then((snapshot) => {
    // For each document in the collection
    snapshot.forEach((doc) => {
      if (doc.data().platform.toLowerCase().includes("browser")) {
        gamesList.push(doc.data().title); // Add title of game into the list
      }
    })
    if (gamesList.length !== 0) { // If list is not empty (retrieval of documents was successful)
      return res.status(200).json(gamesList);
    }
  }).catch((error) => {
    console.error('Failed to retrieve the document(s): ', error);
  })
})


module.exports = router;