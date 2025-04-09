const validateRegister = (req, res, next) => {
  const { name, password, email } = req.body;

  if(!name || !password || !email){
    return res.status(400).json({ message: "bad request" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const nameRegex = /^[a-zA-Z0-9_]+$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({ message: "Username can only contain letters, numbers, and underscores" });
  }

  req.body.name = name.trim();
  req.body.email = email.trim();
  req.body.password = password.trim();

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if( !email || !password){
    return res.status(400).json({ message: "Please provide email and password" });
  }

  next();
};

export { validateRegister, validateLogin };
