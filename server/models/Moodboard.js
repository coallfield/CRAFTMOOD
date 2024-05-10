const {Schema, model} = require('mongoose')

const Moodboard = new Schema({
    name: {type: String, required: true, unique: false},
    photos: [{type: Object}],
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})


module.exports = model('Moodboard', Moodboard)