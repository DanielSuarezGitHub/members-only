const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: { type: Schema.Types.String },
    title: { type: Schema.Types.String},
    content: {type: Schema.Types.String},
    dateCreated: { type: Schema.Types.Date }
})

postSchema.virtual('url').get(function () {
    return '/posts/' + this._id
})

module.exports = mongoose.model('Post', postSchema)