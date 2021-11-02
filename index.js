require("dotenv").config()
const Note = require("./models/note")

const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())
app.use(express.static("build")) // redirect to build folder for frontend
app.use(express.json())

// connecting with models module
// console.log("connecting to", url)

// mongoose
//   .connect(url)
//   .then((result) => {
//     console.log("connected to MongoDB")
//   })
//   .catch((error) => {
//     console.log("error connecting to MongoDB:", error.message)
//   })

let notes = [
  { id: 1, content: "HTML is easy", date: "2019-05-30T17:30:31.098Z", important: true },
  { id: 2, content: "Browser can execute only Javascript", date: "2019-05-30T18:39:34.091Z", important: false },
  { id: 3, content: "GET and POST are the most important methods of HTTP protocol", date: "2019-05-30T19:20:14.298Z", important: true },
]

//////////////////////////////////////

///////////////////////////////////////
// GET "/"
// only works when we don't have frontend in folder build
app.get("/", (req, res) => {
  res.send("<h1>Something went wrong. Those frontend devs smh...</h1>")
})

//////////////////////////////////////////////////////////////////////////
// MONGO GET ALL
// this binds notes variable (from url) to array of obj returned by Mongo
app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

//////////////////////////////////////////////////////////////////////////
// GET SINGLE / MONGO
// if note not found, value of note is null and else block is run
// if findById Promise is rejected, then error 500
app.get("/api/notes/:id", (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

//////////////////////////////////////////////////////////////////
// Delete Mongo way !
app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

/////////////////////////////////////////////////////////////////////
// POST Mongo
app.post("/api/notes", (req, res, next) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({error: "content missing",})
  }

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important,
  })

  note.save()
  .then((savedNote) => savedNote.toJSON())
  .then(savedAndFormattedNote => {  
    console.log("note saved!")    
    res.json(savedAndFormattedNote)    
  }) 
  .catch(error=> next(error))
}) // endPOST




////////////////////////////////////////////////////////////////////////
// PUT update NOTE Mongo
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
}) 







////////////////////////////////////////////////////////////////////////
// Handle unknown urls for user
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)









///////////////////////////////////////////////////////////
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler) // this has to be the last loaded middleware. Even after unknownEndopint after routes


///////////////////////////////////////////
// HEROKU
const PORT = process.env.PORT // || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


///////////////////////////////////////////
// OLD CODE
///////////////////////////////////////////////////////////////////////////
// OLD GET SINGLE
// app.get("/api/notes/:id", (request, response) => {
//   const id = +request.params.id // this is the :id above inside request obj
//   const note = notes.find((note) => note.id === id) // we find the requested note and send it to user

//   if (!note) {
//     response.statusMessage = "Current password does not match"
//     response.status(404, "kek").end()
//     return
//   }
//   response.json(note)
// })

/////////////////////////
// NO HEROKU
// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

/////////////////////////////////////////////////////////////////////
////// OLD POST
// app.post("/api/notes", (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     //content is just a key inside json
//     return response.status(400).json({
//       error: "content missing",
//     })
//   }

//   const maxId = notes.length > 0 ? Math.max(...notes.map((e) => e.id)) : 0
//   const note = {
//     id: maxId + 1, // method not recommended, will be replaced soon
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   }

//   notes = notes.concat(note)
//   response.json(note)
// })

///////////////////////////////////////
// GET ALL
// app.get("/api/notes", (request, response) => {
//   response.json(notes)
// })

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })
// noteSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   },
// })

// const Note = mongoose.model("Note", noteSchema)

// OLD way to connect
// const DBpassword = process.argv[2]
// const url = `mongodb+srv://user:${DBpassword}@cluster0.ao7mu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// mongoose.connect(url)

//////////////////////////////////////////////////////////////////
// OLD Delete
// app.delete("/api/notes/:id", (req, res) => {
//   const id = +req.params.id
//   notes = notes.filter((note) => note.id !== id)

//   res.status(204).end()
// })
