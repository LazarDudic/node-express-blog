const mongoose = require('mongoose');
var slugify = require('slugify');

const categorySchema = new mongoose.Schema({
    name : { type : String , required : true, unique: true},
    slug: { type: String, required: true, unique: true},
},
    {timestamps : true }
);

categorySchema.pre('validate', function(next) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
  });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;