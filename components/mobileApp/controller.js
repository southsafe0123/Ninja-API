
const NewsModels = require('./model');

const getNews = async () => {
    try {
        const news = await NewsModels.find();
        return news;
    } catch (error) {
        throw new Error(error.message);
    }
}
const getDetailNews =  async (id) => {
    try {
        const newsDetail = await NewsModels.findById(id);
        return newsDetail;
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = {
    getNews,
    getDetailNews
}