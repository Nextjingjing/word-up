const mongoose = require("mongoose");

const SuccessSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', require: true},
    challengeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true }],
});

const Success = mongoose.model("Success", SuccessSchema);
module.exports = Success;