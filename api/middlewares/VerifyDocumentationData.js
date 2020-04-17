const db = require('../models');
const Category = db.categories;

checkDuplicatedCategory = (req, res, next) => {
    const categoryName = req.body.categoryName.toLowerCase();
    Category.findOne({
        where: {
            categoryName
        }
    })
    .then(category => {
        if (category) {
            res.status(400).json({
                errors: [{message: 'Cette catégorie existe déjà.'}]
            });
            return;
        }

        next();
    });
};

const verifyDocumentationData = {
    checkDuplicatedCategory: checkDuplicatedCategory
};

module.exports = verifyDocumentationData;
