const mongoose = require('mongoose');
var slugify = require('slugify')

const blogSchema = new mongoose.Schema({
    title : { type : String , required : true},
    body : { type : String , required : true},
    image : { type : String },
    slug: { type: String, required: true, unique: true},
},
    {timestamps : true }
);

blogSchema.pre('validate', function(next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
  });

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;