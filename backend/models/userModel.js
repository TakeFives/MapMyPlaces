import User from "../schemas/userSchema.js";

const userModel = {
  getAll: async function () {
    return await User.find();
  },
  getById: async function (id) {
    return await User.findById(id);
  },
  getByEmail: async function (email) {
    return await User.findOne({ email: email });
  },
  create: async function (userData) {
    const user = new User(userData);
    await user.save();
    return user;
  },
};

export default userModel;
