const mongoose = require('mongoose')
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()}

const url = process.env.MONGODB_URI
mongoose.Promise = global.Promise


mongoose.connect(url)

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

personSchema.statics.format = function(person){
    return{
    name: person.name,
    number: person.number,
    id: person._id
    }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person