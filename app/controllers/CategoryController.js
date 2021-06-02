const Category = require('../models/Category');
const { validationResult } = require('express-validator');


module.exports.index = async (req, res) => {
    const categories = await Category.find().sort({createdAt:-1});

    return res.render('admin/categories/index', {
      title: 'Categories',
      categories: categories,
  });
}

module.exports.create = (req, res) => {
    return res.render('admin/categories/create', {
      title: 'Create Category',
  });
}

module.exports.createPost = async (req, res) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.render('admin/categories/create', { errors: valErrors.array(), blog: req.body, title: 'Create Blog' });
    }

    let category = new Category();
    category.name = req.body.name;
    try {
        category.save();
        await req.flash('success', 'Category successfully created!');
        return res.redirect('/admin/categories/index');
    } catch (error) {
        return res.render('admin/categories/create', {
            title: 'Create Category',
            error: error,
        });
    }
}

module.exports.edit = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug});
        if (! category) throw new Error('Category not found');

        return res.render('admin/categories/edit', {
            title: 'Edit Category',
            category: category,
        });
    } catch (error) {
        await req.flash('error', error.message);
        return res.redirect('/admin/categories/index');
    }
}

module.exports.update = async (req, res) => {
    try {
        let category = await Category.findOne({ slug: req.params.slug});
        if (! category) throw new Error('Category not found');

        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) {
            return res.render('admin/categories/edit', {title: 'Edit Category', category: req.body, errors: valErrors.array() });
        }

        category.name = req.body.name;
        
        category.save();
        await req.flash('success', 'Category successfully updated!');
        return res.redirect('/admin/categories/index');

    } catch (error) {
        await req.flash('error', error.message);
        return res.redirect('/admin/categories/index');
    }
}

module.exports.delete = async (req, res) => {
    try {
        let category = await Category.findOne({ slug: req.params.slug});
        if (! category) throw new Error('Category not found');

        category.delete();

        await req.flash('success', 'Category successfully deleted!');
        return res.redirect('/admin/categories/index');
    } catch (error) {
        await req.flash('error', error.message);
        return res.redirect('/admin/categories/index');
    }
}


