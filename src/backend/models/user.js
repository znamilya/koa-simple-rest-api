// 'use strict';

// let mongoose = require('mongoose');


// let schema = new mongoose.Schema({
//     name: {
//         type: String,
//         unique: true
//     },

//     age: {
//         type: String,
//         required: "Должен быть возраст."
//     }
// });

// module.exports = mongoose.model('User', schema);


const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// uniqueValidator validation is not atomic! unsafe!
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: "E-mail пользователя не должен быть пустым.",
        validate: [
            {
                validator: function(value) {
                    return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
                },
                msg:       'Некорректный email.'
            }
        ],
        unique: true
    },
    name: {
        type: String,
        required: "Должно быть имя."
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(uniqueValidator, { 
    message: 'Ошибка: {PATH} уже существует.' }
);

module.exports = mongoose.model('User', userSchema);
