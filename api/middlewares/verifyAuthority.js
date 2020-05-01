isAdmin = (req, res, next) => {
    if ( req.user.role !== 'admin') {
        res.status(401).json({ error: 'Non autorisé.'})
    } else {
        next()
    }
};

isPartnerOrAdmin = (req, res, next) => {
    if ( req.user.role === 'admin' || req.user.role === 'partner') {
        next()
    } else {
        res.status(401).json({ error: 'Non autorisé.'})
    }
};

isOwnProfile = (req, res, next) => {
    if ( req.user.id === req.body.id) {
        next()
    } else {
        res.status(401).json({ error: 'Non autorisé.'})
    }
};

const verifyAuthority = {
    isAdmin: isAdmin,
    isPartnerOrAdmin: isPartnerOrAdmin,
    isOwnProfile: isOwnProfile
};

module.exports = verifyAuthority;


