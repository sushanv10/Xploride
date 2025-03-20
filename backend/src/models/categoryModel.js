const db = require('../config/db');

exports.addCategory = async (categoryName) => {
    try {
        const [result] = await db.execute(
            "INSERT INTO category (categoryName) VALUES(?)",
            [categoryName]
        );
        console.log("Insert Result:", result);
        return result;
    } catch (error) {
        console.log("Error Inserting Category:", error);
        throw error   
    }
};

exports.getAllCategory = async () => {
    try {
        const [category] = await db.query(
            "SELECT * FROM category"
        );
        return category;
    } catch (error) {
        console.log("Error retrieving category:", error);
        throw error;
    }
};

exports.getCategoryById = async (categoryId) => {
    try {
        const [category] = await db.query(
            "SELECT * FROM category WHERE categoryId = ?", [categoryId]
        );
        return category[0];
    } catch (error) {
        console.log("Error getting category by id:", error);
        throw error;   
    }
};

exports.updateCategoryById = async (categoryId, updateCategory) => {
    if(categoryId === undefined || categoryId === null){
        throw new error ("Category Id is undefined or null");
    }
    const {categoryName} = updateCategory;

    try {
        const [result] = await db.execute(
            "UPDATE category SET categoryName = ?, , updated_at = CURRENT_TIMESTAMP WHERE categoryId = ?",
            [categoryName, categoryId]
        );
        console.log("Update Result:", result);
        return result;
    } catch (error) {
        console.log("Error updating category,:" , error);
        throw error;
    }    
};

exports.deleteCategoryById = async (categoryId) => {
    if(categoryId === undefined || categoryId === null){
        throw new error ("Category Id is undefined or null");
    }
    console.log(categoryId);

    try {
        const [result] = await db.execute(
            "DELETE FROM category WHERE categoryId = ?", [categoryId]
        );
        console.log("Delete Result:", result);
        return result;
    } catch (error) {
        console.log("Error deleting category:", error);
        throw error;
    }
};