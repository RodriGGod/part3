const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = `mongodb+srv://PhoneBook:PhoneBook@phonebook.2adnw.mongodb.net/?retryWrites=true&w=majority&appName=PhoneBook`

console.log('connecting to', url)

mongoose.connect(url)

    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

    
    const personSchema = new mongoose.Schema({
        name: {
            type: String,
            minLength: 3,
            required: true
        },
        number: {
            type: String,
            validate: {
                validator: function (value) {
                    // Verifica si el número cumple con la estructura y longitud
                    const regex = /^\d{2,3}-\d{5,}$/; // 2-3 números, guion, y al menos 5 números
                    return regex.test(value) && value.length >= 8;
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, 'User phone number is required']
        }
    });

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)