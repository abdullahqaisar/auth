const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password!");

  const token = user.generateAuthToken();
  return res.send(token);
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user)
    return res.status(400).send("IUser with this email already exists!");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let newUser = new User({
    email,
    password: hashedPassword,
  });

  newUser = await newUser.save();

  if (!newUser) throw new BadRequest("Error creating user");

  const token = newUser.generateAuthToken();
  return res.send(token);
};
