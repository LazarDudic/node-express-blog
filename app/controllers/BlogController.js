const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');



module.exports.index = async (req, res) => {
    const blogs = await Blog.find().sort({createdAt:-1});

    return res.render('admin/blog/index', {
      title: 'Blogs',
      blogs: blogs,
  });
}

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

module.exports.edit = async (req, res) => {

    try {
        const blog = await Blog.findOne({ slug: req.params.slug});
        if (! blog) throw new Error('Blog not found');

        return res.render('admin/blog/edit', {
            title: 'Edit Blog',
            blog: blog,
        });
    } catch (error) {
        await req.flash('error', error.message);
        return res.redirect('/admin/blog/index');
    }


}

module.exports.update = async (req, res) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.render('admin/blog/edit/', { errors: valErrors.array(), title: 'Create Blog' });
    }

    try {
        let blog = await Blog.findOne({ slug: req.params.slug});
        if (! blog) throw new Error('Blog not found');

        blog.title = req.body.title;
        blog.body = req.body.body;
        if(req.files) { // Upload image if exists
            const image = req.files.image;
            const imageName = uuidv4()+'-'+image.name;
            const filePath = '/uploads/'+imageName;
            
            image.mv(process.cwd()+'/public/'+filePath, (err) => {
                if (err) throw err;
            });
            if (blog.image) {
                fs.unlink(process.cwd()+'/public'+blog.image, (err) => {
                    if(err) throw err;
                });
            }
            blog.image = filePath;
        }
        blog.save();
        await req.flash('success', 'Blog successfully updated!');
        return res.redirect('/admin/blog/index');

    } catch (error) {
        await req.flash('error', error.message);
        return res.redirect('/admin/blog/index');
    }
}

module.exports.delete = async (req, res) => {
    try {
        let blog = await Blog.findOne({ slug: req.params.slug});
        
        if (! blog) throw new Error('Blog not found');

        if(blog.image) { 
            fs.unlink(process.cwd()+'/public'+blog.image, (err) => {
                if(err) throw err;
            });
        }

        blog.delete();
        await req.flash('success', 'Blog successfully deleted!');
        return res.redirect('/admin/blog/index');

    } catch (error) {
        await req.flash('error', error.message);
        return res.redirect('/admin/blog/index');
    }
}


