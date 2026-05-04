const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: String,
},
    { timestamps: true });

categorySchema.pre('save', async function(next) {
    try {
        this.slug = this.name.toLowerCase().trim().replaceAll(' ', '-');
        next();
    } catch (err) {
        next(err);
    }
});
    const Category = mongoose.model('Category', categorySchema);

module.exports = Category;