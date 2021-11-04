const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')[1];

  let decodedData;
  if (token) {
    try {
      decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decodedData?.id;
      req.isAdmin = decodedData?.isAdmin;
    } catch (error) {
      res
        .status(403)
        .json({ message: 'Token is not valid!', error: error.message });
    }
    next();
  } else {
    res.status(401).json('You are not authenticated!');
  }
};

module.exports = auth;
