const Category = require('./models/Category');

const createCategory = async (req, res) => {
    try{
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (error){
        res.status(400).json({message: error.message});
    }
}

const getAllCategories  = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error){
        res.status(400).json({message: error.message});
    }
}

const getCategoryById   = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404).json({message: 'Category not found'});
        }
        res.status(200).json(category);
    } catch (error){
        res.status(400).json({message: error.message});
    }
}