const express = require("express");

const router = express.Router();

let academicScores = [], attendancePercentage = [], extracurricularActivities = [], basicFitnessScores = [], teamworkSkills = [], recommendationLetters = [], researchExperience = [];

router.post("/data", (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data not found"
        });
        return;
    }
    try {
        if(req.body.academicScores === undefined || req.body.attendancePercentage === undefined || req.body.extracurricularActivities === undefined || req.body.basicFitnessScores === undefined || req.body.teamworkSkills === undefined || req.body.recommendationLetters === undefined || req.body.researchExperience === undefined) {
            res.status(400).send({
                message: "Data not found"
            });
            return;
        }
        academicScores = req.body.academicScores;
        attendancePercentage = req.body.attendancePercentage;
        extracurricularActivities = req.body.extracurricularActivities;
        basicFitnessScores = req.body.basicFitnessScores;
        teamworkSkills = req.body.teamworkSkills;
        recommendationLetters = req.body.recommendationLetters;
        researchExperience = req.body.researchExperience;
        res.send({
            message: "Data received successfully"
        });
    }
    catch (err) {
        res.status(400).send({
            message: "Data not found"
        });
    }
});

router.get("/analyze", async (req, res) => {
    if (academicScores.length === 0 || attendancePercentage.length === 0 || extracurricularActivities.length === 0 || basicFitnessScores.length === 0 || teamworkSkills.length === 0 || recommendationLetters.length === 0 || researchExperience.length === 0) {
        res.status(400).send({
            message: "Data not found"
        });
        return;
    }
    const data = {
        academicScores,
        attendancePercentage,
        extracurricularActivities,
        basicFitnessScores,
        teamworkSkills,
        recommendationLetters,
        researchExperience
    };
    academicScores = [];
    attendancePercentage = [];
    extracurricularActivities = [];
    basicFitnessScores = [];
    teamworkSkills = [];
    recommendationLetters = [];
    researchExperience = [];
    // POST request to the Analytics API with data
    // await fetch("http://localhost:3001/api/v1/analyze", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         res.send(data);
    //     });
    res.send({
        message: "Data analyzed successfully"
    });
});

router.get("/version", (req, res) => {
    res.send({
        version: "1.0.0"
    });
});

module.exports = router;
