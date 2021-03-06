// NOTE this is essentially the main portion of our server
import express from 'express'
import cors from 'cors'
const port = process.env.PORT || 3000
import bp from 'body-parser'
import DbContext from "./db/dbconfig"


//NOTE next we need to create our server
let server = express()

//NOTE Fire up database connection
DbContext.connect()

//NOTE Creates a reference to the build project on the client (if api only remove this line)
server.use(express.static(__dirname + '/../client/dist'))

//NOTE Allows requests from the port 8080, add additional addresses as needed
let whitelist = ['http://localhost:8080', 'http://127.0.0.1:5500/fall19-gregslist/', 'http://127.0.0.1:8080'];
let corsOptions = {
  origin: function (origin, callback) {
    let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions))

//NOTE we are giving our server the bodyparser middleware. This middleware gives use the ability to pass information into our server as a request and parse it from JSON back into objects.
server.use(bp.urlencoded({ extended: true }))
server.use(bp.json())

//NOTE Everything above this line always stays the same

//NOTE next we want to register all our routes(doorways that can be accessed in our app)

//NOTE we have to import access to our controllers
import CarController from './controllers/CarController'
// import HouseController from './controllers/HouseController'
// import JobController from './controllers/JobController'


//NOTE remember the forward slash at the start of your path!
server.use('/api/cars', new CarController().router)
// server.use('/api/values', new HouseController().router)
// server.use('/api/values', new JobController().router)


server.get("/", (req, res, next) => {
  res.send("<h1>You Rang?</h1>")
  console.log("You rang?", req);
})


//NOTE Everything below this line always stays the same

//NOTE Default error handler, catches all routes with an error attached
server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } })
})

//NOTE Catch all to insure to return 404 if recieved a bad route
server.use('*', (req, res, next) => {
  res.status(404).send("Route not found")
})


server.listen(port, () => {
  console.log(`Server ${port} is running, better catch it!`);
})

