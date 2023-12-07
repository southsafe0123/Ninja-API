
const CategoryModel = require('./model');
// lấy danh sách danh mục
const getAllCategories = async () => {
   try {
  const categoriers = await CategoryModel.find({});
  return categoriers;
   } catch (error) {
    console.log(error);
    throw new Error('Co loi xay ra')
   }
}

// lấy chi tiết danh mục
const getCategoryById = async (id) => {
   try {
    const category = await CategoryModel.findById(id);
    return category
   } catch (error) {
    console.log(error);
    throw new Error('Có lỗi với bạn');
   }
}

// thêm mới danh mục
const createCategory = async (data) => {
 try {
    const {name, description} = data;
    const category = new CategoryModel({name, description});
    await category.save();
 } catch (error) {
    console.log(error);
    throw new Error('Thêm mới không thành công')
 }
}

// cập nhật danh mục
const updateCategory = async (_id, data) => {
    try {
        const {name, description} = data
        const category = await CategoryModel.findById(_id);
        console.log(category)
       if(category){
        category.name = name;
        category.description = description;
        await category.save();
       }
       
       } catch (error) {
        console.log(error);
        throw new Error('Cập nhật không thành công');
       }
}

// xóa danh mục
const deleteCategory = async (id) => {
    try {
        await CategoryModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Xoa khong thanh cong');
    }
}
//xoas danh muc hteo id

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}