const mongoose = require('mongoose')
const tunnus = 'jypinpelaaja:kissa123'

const url = `mongodb://${tunnus}@ds121182.mlab.com:21182/fullstackdb`

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
})

if(process.argv.length < 3){
Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else{
person
    .save()
    .then(result => {
        console.log(`lisätään henkilö ${result.name} numero ${result.number} luetteloon`)
        mongoose.connection.close()
    })
}