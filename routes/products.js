const express = require('express');
const router = express.Router();
const ProductControler = require('../components/products/controller');
const checkToken = require('../components/helper/Checktoken');
const validation = require('../components/helper/Vadiation');
/**
 * Lay danh sach san pham
 * http://localhost:3000/products
 * method: GET
 */
router.get('/', async (req, res, next) => {
    try {
        const { size, page } = req.query;
        const products = await ProductControler.getAllProducts(size, page);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});
//lấy chi tiết sản phẩm theo id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const products = await ProductControler.getProductById(id);
        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

//tìm sản phẩm theo tên
router.get('/search/name', async (req, res, next) => {
    try {
        const { name } = req.query;
        const products = await ProductControler.searchProduct(name);
        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})
//thêm sản phẩm
router.post('/', [checkToken, validation.validateProduct], async (req, res, next) => {
    try {
        const { body, user } = req;
        //xac dinh ai tao san pham
        
        await ProductControler.createProduct(body, user._id, user._id);
        return res.status(200).json({ message: 'Thêm mới thành công' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Thêm mới không thành công' });
    }

})
//update
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        await ProductControler.updateProduct(id, body);
        res.status(200).json({ message: 'Cập nhật  thành công' });
    } catch (error) {
        console.log("llll", error);
        return res.status(500).json({ message: 'Cập nhật không thành công' });
    }
})
//delete
router.delete('/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        await ProductControler.deleteProduct(id);
        return res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Xóa không thành công' });
    }
})


module.exports = router;