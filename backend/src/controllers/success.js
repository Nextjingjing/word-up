const Success = require("../models/success");

const addChallengeUser = async (req, res) => {
    try {
        const challengeId = req.params.challengeId;
        const userId = req.user._id;

        let existingSuccess = await Success.findOne({ userId });

        if (existingSuccess) {
            if (!existingSuccess.challengeIds.includes(challengeId)) {
                existingSuccess.challengeIds.push(challengeId);
                await existingSuccess.save();
            }
        } else {
            existingSuccess = new Success({
                userId: userId,
                challengeIds: [challengeId],
            });
            await existingSuccess.save();
        }

        res.status(200).json({ message: "Challenge added successfully!", success: existingSuccess });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const listChallengeUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const successRecords = await Success.find({ userId })
        if (!successRecords || successRecords.length === 0) {
            return res.status(404).json({ message: "User has not completed any challenges." });
        }

        res.status(200).json({ success: true, data: successRecords });
    } catch (err) {
        console.error("Error fetching user challenges:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { addChallengeUser, listChallengeUser };