const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    amount: Number,
    unit: Number,
})

const recipeSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        ingredients :[ingredientsSchema],
        steps: [String],
        cookingTime: Number,
        servings: {
            type: Number,
            default: 4
        },
        difficulty:{
            type: String,
            enum: ['easy', 'medium', 'hard']
        },
        isVegetarian:{
            type: Boolean,
            default: false
        },
        number: {
            type: Number,
            min : 1,
            max: 5
        }
    },
    { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;