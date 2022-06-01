import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const exerciseSchema = mongoose.Schema({
	name: { type: String, required: true },
    reps: {type: Number, required: true },
	weight: { type: Number, required: true },
	unit: { type: String, required: true },
    date: { type: String, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create an exercise
 * @param {String} name, >1CHAR --> != null or ""
 * @param {Number} reps, int>0
 * @param {Number} weight, int>0
 * @param {String} unit, kgs or lbs
 * @param {String} date, MM-DD-YY
 * @returns A promise.  Resolves to the JS object for the document created by calling save.
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});

    if (name === "" || name === null) {
        throw "Invalid request"
    };
    if (reps <= 0) {
        throw "Invalid request"
    };
    if (weight <= 0) {
        throw "Invalid request"
    };
    if (typeof(unit) != "string" || (unit != "lbs" && unit != "kgs")) {
        throw "Invalid request"
    };

    const format = /^\d\d-\d\d-\d\d$/;
    if (!(format.test(date))) {
        throw "Invalid request"
    };

    console.log(`added new exerise ${name}`);
    return exercise.save();
};

/**
 * Find all exercise(s)
 */
const findExercise = async () => {
    const exercise = await Exercise.find({}).exec();
    return exercise;
};

/**
 * Retrieve exercise from ID.
 */
const retrieveExercise = async (objId) => {
    console.log(`retrieving exercise...`);
    const exercise = await Exercise.findById(objId).exec();
    return exercise;
};

/**
 * Update exercise from ID.
 */
const updateExercise = async (objId, Obj) => {
    const {name, reps, weight, unit, date} = Obj.body
    if (name === "" || name === null) {
        throw "Invalid request"
    };
    if (reps <= 0) {
        throw "Invalid request"
    };
    if (weight <= 0) {
        throw "Invalid request"
    };
    if (unit !== "lbs" && unit !== "kgs") {
        throw "Invalid request"
    };

    const format = /^\d\d-\d\d-\d\d$/;
    if (!(format.test(date))) {
        throw "Invalid request"
    };
    
    const updateExercise = await Exercise.findByIdAndUpdate(objId, Obj.body)
    if (updateExercise === null) {
        throw "Not found"
    };

    console.log(`updating exercise: ${objId}`);

    return updateExercise;
};

/**
 * Delete exercise from ID.
 */
const deleteExercise = async (objId) => {
    const deleteExercise = await Exercise.findByIdAndDelete(objId);
    console.log(`deleting exercise(s)`);
    return deleteExercise;
};

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export {createExercise, findExercise, retrieveExercise, updateExercise, deleteExercise};