const UserController = require('./model');
const GameModels = require('./modelGame');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mailer = require('../helper/Mailer');
const PassworReset = require('../users/modelIPR');
const { trusted } = require('mongoose');
// đăng ký tài khoản
const register = async (data) => {
    try {
        const { email, name, password, role } = data;
        let user1 = await UserController.findOne({ email });

        if (user1) { throw new Error('Tài khoản Đã tồn tại'); }

        //ma hoa tai khoan
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = new UserController({
            email, name, password: hash, role
        })
        await user.save();
        //gửi email xác thực tài khoản
        setTimeout(() => {
            Mailer.sendMail({
                email: user.email
                , subject: 'Tiêu đề',
                content: `Link xác thực tài khoản: http://localhost:3000/verify-user/${user._id}`
            })
        }, 0);
        return user;
    } catch (error) {

        console.log(error)
        throw new Error(error.message)


    }
}

// đăng nhập
const login = async (data) => {
    try {
        const { email, password } = data;
        let user = await UserController.findOne({ email });
        console.log(email, password, user)
        if (!user) { throw new Error('Tài khoản không tồn tại'); }

        //kiem tra pass
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error('Mật khẩu không chính xác ');
        user.password = undefined;
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role }, 'iloveyou',
            { expiresIn: 1 * 1 * 5 * 60 }
        );
        user = { ...user._doc, token };
        return user;
    } catch (error) {
        throw new Error('Có lỗi khi đăng nhập ')

    }
}
const loginGame = async (body) => {
    try {
        const { email, password } = body;
        let user = await UserController.findOne({ email });

        console.log(email, password, user)
        const note = 0;
        if (!user) {
            throw new Error('Tài khoản không tồn tại')
        }

        //kiem tra pass
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Mật khẩu sai')
        }
        user.password = undefined;
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role }, 'iloveyou',
            { expiresIn: 1 * 1 * 5 * 60 }
        );

        const inforuser = await GameModels.findOne({ users_id: user.id }).populate('users_id').exec();
        if (!inforuser) {

            const data = new GameModels({ Scene: 1, health: 1, suriken: 1, users_id: user._id });
            await data.save();

        }
        const inforuser1 = await GameModels.findOne({ users_id: user.id }).populate('users_id').exec();
        console.log(inforuser1._id)
        user.gameInfor = inforuser1._id;


        user = { ...user._doc, token };

        return user;

    } catch (error) {
        console.log(error)
        throw new Error(error.message)

    }
}
//tạo bảng gamemedels

//xác thực tài khoản
const verify = async (id) => {
    try {
        const user = await UserController.findById(id);

        if (!user) throw new Error('Không tìm thấy tài khoản');
        if (user.isVerified) throw new Error('Tài khoản đã xác thực');
        user.isVerified = true;
        await user.save();
        return true;
    } catch (error) {
        throw new Error('Có lỗi khi đăng nhập!')

    }
}
// cập nhật thông tin tài khoản
const updateProfile = (id, data) => {
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return {};
}


// đổi mật khẩu
const changePassword = async (token, password) => {
    try {
        const decoded = jwt.verify(token, 'abcd');
        if (!decoded) { throw new Error('token khong hợp lệ') }
        const { email } = decoded;
        const passwordReset = await PassworReset.findOne({
            email,
            token,
            status: true,
            create_at: { $gte: new Date(Date.now() - 1 * 1 * 5 * 60 * 1000) }
        });
        if (!passwordReset) { throw new Error('Token không hợp lệ') }
        //mã hóa
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        console.log(password)
        const user = await UserController.findOne({ email });

        user.password = hash;
        await user.save();

        //xóa token
        await PassworReset.updateOne({ email: user.email, token }, { status: false });
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// quên mật khẩu
const forgotPassword = async (email) => {
    try {
        const user = await UserController.findOne({ email });
        if (!user) { throw new Error('Không tìm thấy tài khoản') }
        const token = jwt.sign(
            { _id: user._id, email: user.email },
            'abcd',

            { expiresIn: 1 * 1 * 5 * 60 }
        );
        //lưu token vào db
        const result = new PassworReset({ email, token });
        await result.save();
        //gửi mail khôi phục mk
        setTimeout(() => {
            Mailer.sendMail({
                email: user.email
                , subject: 'Khôi phục mật khẩu',
                content: `Link xác thực tài khoản: http://localhost:3000/reset-password/${token}`
            })
        }, 0);
        return 'Gửi xác nhận thành công';
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}
//check token reset pass
const checkTokenResetPass = async (token) => {
    try {
        const decoded = jwt.verify(token, 'abcd');
        if (decoded) {
            const { email } = decoded;
            const passwordReset = await PassworReset.findOne({
                email,
                token,
                status: true,
                create_at: { $gte: new Date(Date.now() - 1 * 1 * 5 * 60 * 1000) }
            });
            if (passwordReset) { return true; }
            return false;
        }
        return false;
    } catch (error) {
        return false;
    }
}
// xem danh sách tài khoản
const getUserGame = async (_id) => {
    try {
        const result = await GameModels.findOne({ _id });
        return result;
    } catch (error) {
        console.log(error)
        throw new Error()
    }
}
//laasy thong tin gameinfo
const gameInfo = async (_id) =>{
    try {
        const result = await GameModels.findById(_id);
        return result;
    } catch (error) {
       console.log(error) 
    }

}

// xem chi tiết tài khoản
const upDateGame = async (_id, body) => {
    try {
        const result = await GameModels.updateOne({ _id }, { $set: body });
        console.log(body)
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// tìm kiếm tài khoản
const searchUser = (keyword) => {
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return [];
}

// khóa tài khoản
const lockUser = (id) => {
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return {};
}

// mở khóa tài khoản
const unlockUser = (id) => {
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return {};
}

module.exports = {
    register,
    login,
    updateProfile,
    changePassword,
    forgotPassword,
    getUserGame,
    upDateGame,
    searchUser,
    lockUser,
    unlockUser,
    verify,
    checkTokenResetPass,
    loginGame,
    gameInfo 
}