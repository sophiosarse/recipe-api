const Recipe = require('./models/Recipe');

const createRecipe = async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllRecipes = async (req, res) => {
    try {
        const { difficulty, isVegetarian, category, sort, order, page = 1, limit = 10 } = req.query;

        const filter = {};

        if (difficulty) {
            filter.difficulty = difficulty;
        }

        if (isVegetarian !== undefined) {
            filter.isVegetarian = isVegetarian === 'true';
        }

        if (category) {
            filter.category = category;
        }

        let query = Recipe.find(filter);

        if (sort) {
            const sortOrder = order === 'desc' ? -1 : 1;
            query = query.sort({ [sort]: sortOrder });
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        query = query.skip(skip).limit(parseInt(limit));

        const recipes = await query;

        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('category');

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
};