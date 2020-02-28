module.exports = (role) => {
    return function(req, res, next) {
        if(req.dJwt.roles && req.dJwt.roles.includes(role)) {
            next();
        } else {
            res.status(401).json({message: "You are not authorized to perform this request"});
        }
    }
}