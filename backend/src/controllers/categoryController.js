const {addCategory, getAllCategory, getCategoryById, updateCategoryById, deleteCategoryById } = require('../models/categoryModel');

exports.addCategory = async (req, res) => {
    try {
        const {categoryName} = req.body;

        if(!categoryName){
            return res.status(400).json({message: "All fields are required"});
        }

        const result = addCategory(
            categoryName
        );

        return res.status(201).json({
            message: "Category created successfully",
            category: {
                categoryId: result.insertId,
                categoryName,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        });
    } catch (error) {
        console.log("Error creating category:", error);
        return res.status(500).json({message: "Server Error"})
    }
};

exports.getAllCategory = async (_, res) => {
    try {
        const category = await getAllCategory();

        if(category.length === 0){
            return res.status(404).json({message: "No category found"});
        }

        return res.status(200).json({category});
    } catch (error) {
        console.log("Error retrieving category:", error);
        return res.status(500).json({message: "Server Error"});
    }
};

exports.getCategoryById = async (req, res) => {
   try {
     const categoryId = req.params.id ;
 
     const category = await getCategoryById(categoryId);

     if(category.length === 0){
        return res.status(404).json({message: "No category found by id"});
     }

     return res.status(200).json({category});
   } catch (error) {
    console.log("Error retrieving category by id:", error);
    return res.status(500).json({message: "Server Error"});
   }
};

exports.updateCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const {categoryName} = req.body;

        if(!categoryName){
            console.log("ALL fields required");
            return res.status(400).json({message:"All fields required"});
        }

        const updatedCategory = {
            categoryName
        }

        const result = await updateCategoryById(categoryId, updatedCategory);

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: "Category not found"
            });
        }

        return res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory
        });
    } catch (error) {
        console.log("Error updating category:", error);
        return res.status(500).json({
            message: "Server Error"
        });   
    }
};

exports.deleteCategoryById = async (req, res) => {

}