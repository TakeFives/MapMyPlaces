import User from "../schemas/userSchema.js";

const userModel = {
  getAll: async function () {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      throw new Error("Error fetching users from the database");
    }
  },
  getById: async function (id) {
    try {
      const user = await User.findById(id); 
      return user;
    } catch (err) {
      throw new Error("Error fetching user by ID");
    }
  },
  getByEmail: async function (email){
    try{
        const user = await User.findOne({email: email});
        return user;
    } catch (err) {
      throw new Error("Error fetching user by email");
    }
  },
  create: async function (userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  },
};

export default userModel;
