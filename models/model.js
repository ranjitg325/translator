const mongoose = require('mongoose');

const Searchedtext = mongoose.Schema({

    text: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    from_lang: {
        type: String,
        required: true
    },
    to_lang: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Searchedtext', Searchedtext);