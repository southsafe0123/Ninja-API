var express = require('express');
var router = express.Router();
const CategoryControler = require('../components/categories/controller')
router.get('/', async (req, res, next) => {
    try {
        const categoriers = await CategoryControler.getAllCategories();
        res.status(200).json(categoriers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
//lấy chi tiết sản phẩm theo id
router.get('/:id', async (req, res, next) => {
try {
    const {id} = req.params;
    const category = await CategoryControler.getCategoryById(id);
        res.status(200).json(category);
} catch (error) {
    return res.status(500).json({ message: error.message});
}
});
//Thêm mới sản phẩm
router.post('/', async (req, res, next)=>{
    try {
        const {body} = req;
        const category = await CategoryControler.createCategory(body);
        return res.status(200).json({ message: 'Thêm mới thành công'});
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
});
//sửa
router.put('/add/:_id', async (req, res, next)=>{
try {
    const {_id} = req.params;
    const {body}= req;
    await CategoryControler.updateCategory(_id, body);
    return res.status(200).json({ message: 'Cập nhật thành công'});
} catch (error) {
    console.log("lllllll",error)
    return res.status(500).json({ message: error.message});
}
})
router.delete('/:id',  async (req, res, next) => {
    try {
        const {id}= req.params;
        await CategoryControler.deleteCategory(id);
        return res.status(200).json({message:'Xoa thanh cong'});
    } catch (error) {
        return res.status(500).json({message:'Xoa khong thanh cong'});
    }
});
module.exports = router;