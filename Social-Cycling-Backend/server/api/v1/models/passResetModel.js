const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PassResetSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
})

module.exports = PassReset = mongoose.model('passresets', PassResetSchema);