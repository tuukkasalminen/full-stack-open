const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('contents', function(request, response){
    return JSON.stringify(request.body)
})

app.use(cors())
app.use(morgan(':method :url :contents :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
  Person
  .find({})
  .then(person => {
      response.json(person.map(Person.format))
  })
  .catch(error => {
    response.status(400).end()
  })
})

app.get('/info', (request, response) => {
    Person
        .find({})
        .then(person => {
            response.json(`puhelinluettelossa ${person.length} henkilön tiedot      ${new Date()}`)
        })
})

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            response.json(Person.format(person))
        })
        .catch(error => {
            response.status(400).send({error: 'väärä id'})
          })
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person
    .findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => {
        response.json(Person.format(updatedPerson))
    })
    .catch(error => {
        response.status(400).json({error: 'väärä id'})
      })
})

app.delete('/api/persons/:id', (request, response) => {
    Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => {
        response.status(400).json({error: 'väärä id'})
      })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(body.name === "") {
        return response.status(400).json({error: 'name missing'})
    }
    if(body.number === "") {
        return response.status(400).json({error: 'number missing'})
    } else {
    const person = new Person({
        name: body.name,
        number: body.number,
        id: body._id
    })
    Person
    .find({ name: person.name })
    .then(name => {
        if(name.length === 0){
            person
            .save()
            .then(savedPerson => {
                response.json(Person.format(savedPerson))        
            })
            .catch(error => {
                return response.status(400).end()
            })
           } else {  
            return response.status(400).json({error: 'name already found'})
        }}
        ) 
        .catch(error => {
            response.status(400).end()
        })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

