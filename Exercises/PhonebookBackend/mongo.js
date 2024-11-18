const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const PbName = process.argv[3]
const PbNumber = process.argv[4]

const url = `mongodb+srv://PhoneBook:${password}@phonebook.2adnw.mongodb.net/?retryWrites=true&w=majority&appName=PhoneBook`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (PbName && PbNumber) {

  const newPerson = new Person({
    name: PbName,
    number: PbNumber,
  })


  newPerson.save().then(result => {
    console.log(`${newPerson.name} person saved!`)
    mongoose.connection.close()
  }).catch(err => {
    console.log(err)
    mongoose.connection.close()
  })

} else {

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  }).catch(err => {
    console.log(err)
    mongoose.connection.close()
  })

}





