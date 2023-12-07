const express = require('express');
const router = express.Router();
const NewsController = require('../components/mobileApp/controller');

router.get('/', async (req, res, next)=>{
try {
    const news = await NewsController.getNews();
        res.status(200).json(news);
} catch (error) {
    console.log(error);
        return res.status(500).json({ message: error.message });
}

})
router.get('/:id', async (req, res, next)=>{
    try {
        const {id} = req.params;
        const newsDetail = await NewsController.getDetailNews(id);
            res.status(200).json(newsDetail);
    } catch (error) {
        console.log(error);
            return res.status(500).json({ message: error.message });
    }
    
    })
module.exports = router;