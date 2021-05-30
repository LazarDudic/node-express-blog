const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');


module.exports.create = (req, res) => {
    return res.render('admin/blog/create', {
      title: 'Create Blog',
  });
}

module.exports.createPost = async (req, res) => {

    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.render('admin/blog/create', { errors: valErrors.array(), title: 'Create Blog' });
    }

    let blog = new Blog();
    blog.title = req.body.title;
    blog.body = req.body.body;
    try {
        if(req.files) { // Upload image if exists

            const image = req.files.image;
            const imageName = uuidv4()+'-'+image.name;
            const filePath = '/uploads/'+imageName;
            
            image.mv(process.cwd()+'/public/'+filePath, (err) => {
                if (err) throw err;
            });

            blog.image = filePath;
        }

        blog.save();
        await req.flash('success', 'Blog successfully created!');
        return res.redirect('/admin/blog/index');
    } catch (error) {
        return res.render('admin/blog/create', {
            title: 'Create Blog',
            error: error,
        });
    }





}

