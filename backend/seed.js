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

        await Challenge.deleteMany({});
        await Vocab.deleteMany({});
        console.log("Old data deleted!");
        
        const challengeArray = [
            {
                name: "Oxford 3000 words",
                content: "Learning a new language requires building a strong foundation of vocabulary. This collection includes the most important words that every English learner should know. These words are commonly used in daily conversations, writing, and professional communication.",
                img: "images/oxford_3000.jpg"
            },
            {
                name: "Common Phrases",
                content: "Communicating effectively in English requires more than just knowing individual words—it’s about understanding and using common phrases that people use in everyday conversations. This collection includes key phrases that will help learners navigate daily interactions, whether they are greeting someone, asking for help, ordering food, making small talk, or expressing opinions.",
                img: "images/common_phrases.jpg"
            },
            {
                name: "Business English",
                content: "This collection includes key phrases that will help learners navigate daily interactions, whether they are greeting someone, asking for help, ordering food, making small talk, or expressing opinions. These phrases are widely used in both casual and formal situations, making them essential for anyone who wants to speak English naturally and confidently.",
                img: "images/business_english.jpg"
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