import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Context'ten import

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // context'ten login fonksiyonu

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sahte kontrol
    if (
      formData.email === "admin@example.com" &&
      formData.password === "1234"
    ) {
      login(); // context üzerinden login ol
      navigate("/");
    } else {
      alert("Geçersiz giriş");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Şifre:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default Login;
