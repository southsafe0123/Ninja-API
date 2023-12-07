
const checkRoleAdmin = async(req, res, next)=>{
try {
    const {user} = req.user;
    if(user.role<3){
        throw new Error('Ban khong co quyen truy cap');

    }
    next();
} catch (error) {
    console.log("check Role:", error);
    return res.status(401).json({error:'Unauthorzied',
message:"Ban khong co quyen truy cap"});
}
}
const checkRoleManager = async(req, res, next)=>{
    try {
        const {user} = req.user;
        if(user.role<2){
            throw new Error('Ban khong co quyen truy cap');
        }
        next();
    } catch (error) {
        console.log("check Role:", error);
        return res.status(401).json({error:'Unauthorzied',
    message:"Ban khong co quyen truy cap"});
    }
    }

module.exports = {checkRoleAdmin, checkRoleManager};