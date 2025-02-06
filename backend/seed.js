require("dotenv").config();
const mongoose = require("mongoose");

// import model
const { Challenge, Vocab } = require('./src/models/challenge');

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

})
  .catch((err) => console.log(err));

const seed = async() => {
    try{
        const challengeArray = [
            {
                name: "Oxford 3000 words",
                content: "A collection of the most important words for English learners.",
                img: "public/images/oxford3000.png"
            },
            {
                name: "Common Phrases",
                content: "Essential phrases for daily conversation.",
                img: "public/images/common_phrases.png"
            },
            {
                name: "Business English",
                content: "Words and phrases useful in business settings.",
                img: "public/images/business_english.png"
            }
          ];
          
        const insertedChallenges = await Challenge.insertMany(challengeArray);
        
        const vocabArray = [
            {
                english: "Hello",
                thai: "สวัสดี",
                challenge: insertedChallenges[0]._id // Linking to "Oxford 3000 words"
            },
            {
                english: "Good bye",
                thai: "ลาก่อน",
                challenge: insertedChallenges[0]._id // Linking to "Oxford 3000 words"
            },
            {
                english: "Thank you",
                thai: "ขอบคุณ",
                challenge: insertedChallenges[1]._id // Linking to "Common Phrases"
            },
            {
                english: "Meeting",
                thai: "การประชุม",
                challenge: insertedChallenges[2]._id // Linking to "Business English"
            }
          ];
        await Vocab.insertMany(vocabArray);
        console.log("Seed data inserted!");
    }catch(err){
        console.log("ERROR!!!", err)
    }
};

// RUN!
seed();