const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json())

const mealSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    category: String,
});

const Meal = mongoose.model('Meal', mealSchema);

mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.16q4mwe.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('Connected to MongoDB Atlas'));

app.get('/api/main', async (req, res) => {
    console.log('[GET /api/main] ', req.body);
    const meals = await Meal.find();
    res.status(200).send(meals);
});

app.delete('/api/main', async (req, res) => {
    console.log('[DELETE /api/main] ', req.body);
    await Meal.deleteOne({ _id: req.body.id });
    res.status(204).end();
});

app.post('/api/main', async (req, res) => {
    const { name, ingredients, category } = req.body;

    console.log('[POST /api/main] ', req.body);

    const meal = new Meal({
        name,
        ingredients,
        category,
    });

    const savedMeal = await meal.save();
    
    res.status(201).send(savedMeal);
});

app.listen(3000, () => console.log("Server is running"));
