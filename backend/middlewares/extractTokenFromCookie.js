export const extractTokenFromCookie = (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return res.status(401).json({ message: "Access token is missing" });
    }
    req.accessToken = accessToken;
    next();
};