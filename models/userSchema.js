const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: Schema.Types.String },
    password: {type: Schema.Types.String}
})



module.exports = mongoose.model('User', userSchema)