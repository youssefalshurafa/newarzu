import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CategoryModel from '../model/Category.model.js';
import OrderModel from '../model/Order.model.js';

/* Registeration controller */
export async function Register(req, res) {
  const { username, email, pwd } = req.body;
  if (!username || !pwd)
    return res
      .sendStatus(400)
      .json({ message: 'Username and Password are required' });
  /* Check for duplicate username */
  const duplicateUser = await UserModel.findOne({ username: username }).exec();
  const duplicateEmail = await UserModel.findOne({ email: email }).exec();
  if (duplicateUser)
    return res.status(409).json({ message: 'Username already exists' });
  if (duplicateEmail)
    return res.status(408).json({ message: 'Email address already exists' });

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    await UserModel.create({
      username: username,
      roles: { User: 2001 },
      email: email,
      password: hashedPwd,
    });
    res.status(201).json({ message: 'New User Created!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export async function Login(req, res) {
  const { username, pwd } = req.body;
  if (!username || !pwd)
    return res.status(400).json({ msg: 'username and password are required' });
  const foundUser = await UserModel.findOne({ username: username }).exec();
  if (!foundUser) return res.status(404).json({ msg: 'User Not Found!' });
  bcrypt
    .compare(pwd, foundUser.password)
    .then(async (match) => {
      if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: foundUser.username,
              roles: roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
          {
            username: foundUser.username,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken, roles, username });
      } else {
        res.status(401).json({ msg: 'Password Incorrect!' });
      }
    })
    .catch((error) => {
      res.status(500);
    });
}
export async function Logout(req, res) {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(204); //no content
  const refreshToken = cookies.jwt;
  const foundUser = await UserModel.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = '';
  const result = await foundUser.save();

  res.clearCookie('jwt', { httpOnly: true });
  res.sendStatus(204);
}

export async function getUsers(req, res) {
  const users = await UserModel.find();
  if (!users) return res.status(404);
  res.json(users);
}

export async function getUser(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(404);
  const refreshToken = cookies.jwt;

  const foundUser = await UserModel.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);
  res.json(foundUser);
}

export async function deleteUser(req, res) {
  if (!req?.body?.id) return res.status(400).json({ msg: 'User ID required' });
  const foundUser = await UserModel.findOne({ _id: req.body.id }).exec();
  if (!foundUser) return res.status(404).json({ msg: 'User ID not found!' });
  await UserModel.deleteOne({ foundUser });
  res.status(200).json({ msg: `deleted user:${foundUser.username}` });
}

export async function updateUser(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(403);
  const refreshToken = cookies.jwt;

  const foundUser = await UserModel.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  try {
    const body = req.body;

    UserModel.updateOne({ refreshToken }, body, function (err, data) {
      if (err) throw err;

      return res.status(201).send({ msg: 'Record updated' });
    });
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/* Category Controller */
export async function createCategory(req, res) {
  try {
    const category = await CategoryModel.create(req.body);
    res.status(201).json({ success: true, category });
  } catch (error) {
    console.log(error);
  }
}
export async function getCategories(req, res) {
  const categories = await CategoryModel.find();
  if (!categories) return res.status(404);
  res.json(categories);
}
export async function deleteCategory(req, res) {
  if (!req?.body?.id)
    return res.status(400).json({ msg: 'Category name required' });
  const foundCategory = await CategoryModel.findOne({
    _id: req.body.id,
  }).exec();
  if (!foundCategory)
    return res.status(404).json({ msg: 'Category name not found!' });
  await CategoryModel.deleteOne({ foundCategory });
  res.status(200).json({ msg: `deleted Category:${foundCategory.name}` });
}

/* Order Controller */

export async function newOrder(req, res) {
  const { customerName, address, phone, phoneTwo, items, subtotal } = req.body;

  try {
    await OrderModel.create({
      customerName: customerName,
      address: address,
      phone: phone,
      phoneTwo: phoneTwo,
      subtotal: subtotal,
      items: items,
    });
    res.status(201).json({ message: 'New Order Created!' });
  } catch (error) {
    console.log(error);
  }
}
