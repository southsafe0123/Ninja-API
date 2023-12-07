// khai báo các hàm xử lý logic
const ProductModel = require('./model')

// lấy danh sách sản phẩm
const getAllProducts = async (size, page) => {
    try {
        size = size ? parseInt(size) : 10;
        page = page ? parseInt(page) : 1;
        const skip = (page - 1) * size;
        let query = {};
        
        //sắp xếp thứ tự tăng dần
        let sort = { name: -1 }
        const products = await ProductModel.find(query).skip(skip).limit(size)
       ;
        return products;
    } catch (error) {
        throw new Error('Lấy danh sách sản phẩm thất bại');
    }
}

// lấy chi tiết sản phẩm
const getProductById = (id) => {
    try {
        const products = ProductModel.findById(id);
        return products;
    } catch (error) {
        throw new Error('Lấy chi tiết sản phẩm thất bại')

    }

}

// tìm kiếm sản phẩm
const searchProduct = (name) => {
    try {
        const products = ProductModel.find({ name: { $regex: name, $option: 'i' } });
        return products;
    } catch (error) {
        throw new Error('Lấy chi tiết sản phẩm thất bại')

    }
}

// thêm mới sản phẩm
const createProduct = async (data, created_by, updated_by) => {
   try {
    const {name, price, quantity, image, description, category_id} = data;
    const products = new ProductModel({
        name, price, quantity, image, description, category_id, created_by, updated_by
    });
    await products.save();
   } catch (error) {
    console.log(error)
    throw new Error('Thêm sản phẩm thất bại');
   }
}

// cập nhật sản phẩm
const updateProduct = async (_id, data) => {
    try {
        const {name, price, quantity, image, description, category_id} = data;
        const products = await ProductModel.findById(_id);
        console.log(products);
        if (products) {
        products.name = name || products.name;
        products.price = price || products.price;
        products.quantity = quantity || products.quantity;
        products.image = image || products.image;
        products.description = description || products.description;
        products.category_id = category_id || products.category_id;
        await products.save();}else{
            throw new Error('Không tìm thấy sản phẩm');
        }
     
       } catch (error) {
        console.log("có lỗi ở controller: ", error);
        throw new Error('Sửa sản phẩm thất bại');
       }
}
//sửa sản phẩm

// xóa sản phẩm
const deleteProduct = async (id) => {
   try {
    await ProductModel.findByIdAndDelete(id);
   } catch (error) {
    throw new Error('Xóa sản phẩm thất bại');
   }
}
//xoa 1 danh muc


module.exports = {
    getAllProducts,
    getProductById,
    searchProduct,
    createProduct,
    updateProduct,
    deleteProduct
}