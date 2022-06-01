import 'dotenv/config';
import express from 'express';
import * as exercises from './exercise_model.mjs';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.post("/exercises", (req, res) => {
    const {name, reps, weight, unit, date} = req.body
    exercises.createExercise(name, reps, weight, unit, date)
    .then((result) => {
        res.status(201).json(result)
    })
    .catch((error) => {
        console.error(error);
        res.status(400).json({Error: error});
    });
});

app.get("/exercises", (req, res) => {
    exercises.findExercise()
    .then((result) => {
        res.status(200).json(result)
    })   
    .catch((error) => {
        console.error(error);
        res.status(400).json({Error: "Server request failed"})
        });
});

app.get("/exercises/:_id", (req, res) => {
    const exerciseId = req.params._id;
    exercises.retrieveExercise(exerciseId)
    .then((result) => {
        if (result !== null) {
            res.json(result);
        }
        else {
            console.log("not found")
            res.status(404).json({Error: "Not found"})
        }

    })
})

app.put("/exercises/:_id", (req, res) => {
    const exerciseId = req.params._id;
    exercises.updateExercise(exerciseId, req)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error(error);
            if (error === "Invalid request") {
                res.status(400).json({Error: error});
            }
            else if (error === "Not found") {
                res.status(404).json({Error: error});
            }
            else {
                res.status(400).json({Error: "Server request failed"})
            };
        });
});

app.delete("/exercises/:_id", (req, res) => {
    const objId = req.params._id;
    exercises.deleteExercise(objId)
    .then((result) => {
        if (result === null) {
            res.status(404).json({Error: "Not found"})
        }
        else {
            res.status(204).send()
        }
    })
    .catch((error) => {
        console.log(error);
        res.send({Error: "Server request failed"})
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})