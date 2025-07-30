import { useEffect, useState } from "react";
import axios from "axios";

function Settings() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      const res = await axios.get("http://localhost:3001/admin");
      setAdmin(res.data);
    };
    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("http://localhost:3001/admin", admin);
    alert("Profil güncellendi!");
  };

  return (
    <div className="container mt-4">
      <h2>Profil Ayarları</h2>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Ad</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={admin.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">E-posta</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={admin.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Yeni Şifre</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={admin.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary">Güncelle</button>
      </form>
    </div>
  );
}

export default Settings;
