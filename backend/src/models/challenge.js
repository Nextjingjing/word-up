const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: String,
    img: { type: String, unique: true },
  }, { timestamps: true });

const VocabSchema = new mongoose.Schema({
    english: { type: String, required: true },
    thai: { type: String, required: true },
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }
});

const Challenge = mongoose.model('Challenge', ChallengeSchema);
const Vocab = mongoose.model('Vocab', VocabSchema);

module.exports = { Challenge, Vocab};