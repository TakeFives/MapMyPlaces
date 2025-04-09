import { hashPassword, verifyPassword } from "../utils/passwords.js";
import userModel from "../models/userModel.js";
import { createTokens, setTokenCookies } from "../utils/jwt.js";

const userController = {
  registerUser: async function (req, res) {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await hashPassword(password);
      const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).send("Error registering user: " + error.message);
    }
  },
  loginUser: async function (req, res) {
    const { email, password } = req.body;
    try {
      const user = await userModel.getByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await verifyPassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const tokens = createTokens(user);
      
      user.refreshToken = tokens.refreshToken;
  
      setTokenCookies(res, tokens);
  
      res.status(200).json({
        token: tokens.accessToken,
        user: {
          id: user.id,
          name: user.name,
        },
      });
    } catch (error) {
      res.status(500).send("Error logging in user: " + error.message);
    }
  },
  getUserById: async function (req, res) {
    const { id } = req.params;
    try {
      const user = await userModel.getById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).send("Error fetching user: " + error.message);
    }
  },
};

export default userController;
