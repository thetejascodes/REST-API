import ApiError from '../../common/utils/api-error';
import User from './auth.model'
import { verifyAccessToken, verifyRefreshToken } from '../../common/utils/jwt.utils'

const isAuthenticated = (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw new ApiError.unauthorized("Not Authenticated")
    }
    const decoded = verifyAccessToken(token)
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new ApiError.unauthorized("User no longer exists")
    }
    req.user = {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
    }
    next();
}
const authorize = (...roles)=>{
   return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        throw new ApiError.forbidden("You do not have permission to perform this action")
    }
    next();
   }
}

export {isAuthenticated,authorize}