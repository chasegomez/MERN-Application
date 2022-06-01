import React, { useState } from "react";
import { useHistory } from "react-router-dom";



export const CreatePage = () => {
    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("");
    const [date, setDate] = useState("");

    const history = useHistory();

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch("/exercises", {
            method: "POST",
            body: JSON.stringify(newExercise),
            headers: {
                "Content-Type": "application/JSON",
            },
        });
        if (response.status === 201) {
            alert("Success!")
        }
        else {
            alert("Failed to add exercise")
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Create exercise</h1>
            <form>
                <input
                    type="text"
                    placeholder="Exercise name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="number"
                    placeholder="Reps completed"
                    min="1"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
                <input
                    type="number"
                    placeholder="Weight used"
                    min="1"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
                <select 
                    name="unit"
                    value={unit}
                    onChange={e => setUnit(e.target.value)}>
                    <option value="">--Please choose an option--</option>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select>
                <input
                    type="text"
                    placeholder="Date: DD-MM-YY"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                </form>
                <button
                    onClick={createExercise}>Add</button>
            
        </div>
    );
}

export default CreatePage;