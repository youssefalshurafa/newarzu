import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(401);
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;

      next();
    });
  } catch (err) {
    res.status(403).send({ msg: 'No token' });
  }
};

export default verifyJWT;
