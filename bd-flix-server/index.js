const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
require('dotenv').config();

//implement jwt token
const jwt = require('jsonwebtoken')

app.use(cors());
app.use(express.json());

//firebase*************************************************

const multer = require("multer");
const firebase = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyC6rov5IQ_uuDeY_DRnHhSADgnb3XoukL8",
    authDomain: "bdflix-f2281.firebaseapp.com",
    projectId: "bdflix-f2281",
    storageBucket: "bdflix-f2281.appspot.com",
    messagingSenderId: "259794146141",
    appId: "1:259794146141:web:bab53915941d9a79830eb4"
};
firebase.initializeApp(firebaseConfig);
const storage = getStorage()
const upload = multer({ storage: multer.memoryStorage() });

app.post('/uploadVideo', upload.single("filename"), (req, res) => {
    const storageRef = ref(storage, req.file.originalname);
    const metadata = {
        contentType: 'video/mp4'
    };
    uploadBytes(storageRef, req.file.buffer, metadata)
        .then(() => {
            // console.log("file uploaded");
            getDownloadURL(storageRef).then(url => {
                // console.log(`Download URL: ${url}`);

                res.send({ url });
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send(error);
        });
});

// upload image------------------------------------------------------------------------

app.post('/uploadPhoto', upload.single("imageFile"), (req, res) => {
    const storageRef = ref(storage, req.file.originalname);
    const metadata = {
        contentType: 'image/jpeg'
    };
    uploadBytes(storageRef, req.file.buffer, metadata)
        .then(() => {
            getDownloadURL(storageRef).then(url => {
                res.send({ url });
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send(error);
        });
});

//firebase**********************************************************************

app.get('/', (req, res) => {
    res.send('hello');
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ac1kfa5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        const ComediesCollection = client.db("bdFlix").collection("comedies");
        const allMoviesCollection = client.db("bdFlix").collection("allmovies");
        const allUsers = client.db("bdFlix").collection("user");
        //user collection
        const usersCollection = client.db("bdFlix").collection("user");
        const usersCollections = client.db("bdFlix").collection("userProfile");

        // Movie recomended system end*******************************************

        const Natural = require('natural');
        const fs = require('fs');
        const csv = require('csv-parser');

        let newData = [];

        fs.createReadStream('new.csv')
            .pipe(csv())
            .on('data', (row) => {
                newData.push(row);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
            });

        app.get('/recommend/:movie', async (req, res) => {
            try {
                let movie = req.params.movie;
                let index;
                for (let i = 0; i < newData.length; i++) {
                    const lowercaseMovie = newData[i].title.toLowerCase();

                    if (newData[i].title === movie || lowercaseMovie == movie) {
                        index = i;
                        break;
                    }
                }
                let allTags = newData.map(data => data.tags);
                let TfIdf = new Natural.TfIdf();
                TfIdf.addDocument(allTags);
                let similarity = [];
                for (let i = 0; i < allTags.length; i++) {
                    similarity.push(TfIdf.tfidf(allTags[i], index));
                }
                let distances = [];
                for (let i = 0; i < allTags.length; i++) {
                    if (i === index) {
                        continue;
                    }
                    distances.push({ index: i, distance: similarity[i] });
                }
                distances.sort((a, b) => b.distance - a.distance);
                let recommendedMovies = [];
                for (let i = 0; i < 10; i++) {
                    recommendedMovies.push(newData[distances[i].index].title);
                }
                const words = [];
                for (const movie of recommendedMovies) {
                    const movieWords = movie.replace(/[^\w\s]/gi, '').split(" ");
                    for (const word of movieWords) {
                        words.push(word);
                    }
                    words.push(req.params.movie);
                }

                let wordsLowerCase = words.map(word => word.toLowerCase());
                allMoviesCollection.createIndex({ original_title: "text" });

                allMoviesCollection.find({ $text: { $search: wordsLowerCase.join(" ").toString() } }).toArray((error, result) => {
                    if (error) {
                        return console.log(error);
                    }
                    res.send(result);
                });
            } catch (error) {
                if (error instanceof TypeError || Object.keys(result).length === 0) {
                    res.send(await generateRandomData());
                }
            }
        });
        const axios = require('axios');
        async function generateRandomData() {
            try {
                const response = await axios.get('http://localhost:5000/allMovie');
                const data = response.data;

                const randomData = [];
                while (randomData.length < 6) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const randomItem = data[randomIndex];
                    if (!randomData.includes(randomItem)) {
                        randomData.push(randomItem);
                    }
                }

                return randomData;
            } catch (error) {
                console.error(error);
                return [];
            }
        }
        // Movie recomended system end*******************************************


        app.get('/mostPopularMovies', async (req, res) => {
            const result = await MostPopularMoviesCategoriCollection.find({}).toArray();
            res.send(result);
        })

        app.post('/allmovies', async (req, res) => {
            const allmovies = req.body;

            // Get the highest ID from the existing movie documents
            const highestId = await allMoviesCollection.find({}).sort({ id: -1 }).limit(1).toArray();

            // Set the new ID for the movie document to be inserted
            allmovies.id = highestId.length === 0 ? 0 : highestId[0].id + 1;

            const result = await allMoviesCollection.insertOne(allmovies);
            res.send(result);
        });

        // app.post('/allmovies', async (req, res) => {
        //     const allmovies = req.body;
        //     const result = await allMoviesCollection.insertOne(allmovies);
        //     res.send(result);
        // })

        //  movie upload in mongodb 

        app.post('/addMovie', async (req, res) => {
            const upLoaded = req.body;
            const result = await allMoviesCollection.insertOne(upLoaded)
            res.send(result);
        });

        //   all users get 

        app.get('/allUsers', async (req, res) => {
            const result = await allUsers.find({}).toArray();
            res.send(result);
        })
        app.post('/userProfile', async (req, res) => {
            const userProfile = req.body;
            const result = await usersCollections.insertOne(userProfile)
            res.send(result);
        })

        app.get('/userprofile', async (req, res) => {
            const result = await usersCollections.find({}).toArray();
            res.send(result);
        })



        // all movies get 

        app.get('/allMovie', async (req, res) => {
            const result = await allMoviesCollection.find({}).toArray();
            res.send(result)
        })


        // delete button  

        app.delete('/allMovie/:id', async (req, res) => {
            const { id } = req.params;

            const deleteId = { _id: ObjectId(id) };

            const result = await allMoviesCollection.deleteOne(deleteId);

            res.send(result);
        });
        //   update movie ---------------------

        app.put('/updateMovie/:updateId', async (req, res) => {
            const id = req.params.updateId;


            const filter = { _id: ObjectId(id) };
            const user = req.body;

            const option = { upsert: true };
            const updatedMovie = {
                $set: user,
            }

            const result = await allMoviesCollection.updateOne(filter, updatedMovie, option);

            res.send(result);
        })

        app.get('/MoviesForYou', async (req, res) => {
            const result = await MoviesForYouCategoriCollection.find({}).toArray();
        })
        app.get('/movies', async (req, res) => {
            const result = await allMoviesCollection.find({}).toArray();
            res.send(result);
        })

        app.get('/allsearch', async (req, res) => {
            const result = await allMoviesCollection.find().toArray();
            res.send(result);
        })

        // get movie by category
        app.get('/allmovie/:category', async (req, res) => {
            const allmovies = req.params.category;
            const getmovies = await allMoviesCollection.find({}).toArray();
            const result = await getmovies.filter(getmovie => getmovie.category == allmovies);
            res.send(result);
        })

        app.get('/movie/:id', async (req, res) => {
            const allmovies = req.params.id;
            const getmovies = await allMoviesCollection.find({}).toArray();
            const result = await getmovies.find(getmovie => getmovie.id == allmovies);
            res.send(result);
        })

        app.get('/comedies', async (req, res) => {
            const comedies = await ComediesCollection.find({}).toArray();
            res.send(comedies);
        })

        //save user email and generate JWT token
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email
            const user = req.body
            const filter = { email: email }
            const options = { upsert: true }
            const updateDoc = {
                $set: user,
            }
            const result = await usersCollection.updateOne(filter, updateDoc, options)
            console.log(result)

            const token = jwt.sign(user, process.env.ACCESS_TOKEN,
                { expiresIn: '1d' })
            console.log(token);
            res.send({ result, token })
        })

    }


    finally { }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`listening on ${port}`);
})
