import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { login, register } from "../../services/api/authApi.js";

function Auth() {
  const { setUserContext } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const loginFormRef = useRef(null);
  const registerFormRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateForm({ ...formData, [name]: value });
  }

  function validateForm(data) {
    if (isRegister) {
      setIsFormValid(
        data.name.trim() !== "" &&
          data.email.trim() !== "" &&
          data.password.trim() !== "" &&
          data.password === data.confirmPassword
      );
    } else {
      setIsFormValid(data.email.trim() !== "" && data.password.trim() !== "");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (isRegister) {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setIsRegister(false);
        if (registerFormRef.current) registerFormRef.current.reset();
      } else {
        const response = await login({
          email: formData.email,
          password: formData.password,
        });
        console.log("Login successful:", response);
        await setUserContext();

        navigate("/");
        if (loginFormRef.current) loginFormRef.current.reset();
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  }

  return (
    <div className="auth-container container text-center">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form
        ref={isRegister ? registerFormRef : loginFormRef}
        className="auth-form"
        onSubmit={handleSubmit}
      >
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {isRegister && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <p>
        {isRegister ? (
          <>
            Already have an account?{" "}
            <a
              href="#"
              className="text-link"
              onClick={() => setIsRegister(false)}
            >
              Login
            </a>
          </>
        ) : (
          <>
            Need an account?{" "}
            <a
              href="#"
              className="text-link"
              onClick={() => setIsRegister(true)}
            >
              Register
            </a>
          </>
        )}
      </p>
    </div>
  );
}

export default Auth;
