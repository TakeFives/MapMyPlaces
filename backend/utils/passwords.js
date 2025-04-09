import bycrypt from "bcryptjs";

export const hashPassword = async (password) => {

  const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

  return bycrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password, hashPassword) => {
  return bycrypt.compare(password, hashPassword);
};
