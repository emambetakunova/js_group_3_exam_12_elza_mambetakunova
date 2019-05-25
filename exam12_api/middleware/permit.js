const permit = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({message: 'Unauthenticated'});
        }

        if (!roles.includes(req.user.role)) {
            console.log(typeof roles);
            return res.status(403).send({message: 'Unauthorized'});
        }

        next();
    }
};

module.exports = permit;