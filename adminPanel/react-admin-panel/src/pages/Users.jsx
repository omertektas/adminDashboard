import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Veriyi çek
  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Kullanıcılar alınamadı:", err);
      });
  }, []);

  // Form input değişiklikleri
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };  

  // Ekleme veya güncelleme
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingUser) {
      // Güncelleme
      try {
        const res = await axios.put(
          `http://localhost:3001/users/${editingUser.id}`,
          formData
        );
        const updatedUsers = users.map((u) =>
          u.id === editingUser.id ? res.data : u
        );
        setUsers(updatedUsers);
        setEditingUser(null);
      } catch (err) {
        console.error("Güncelleme hatası:", err);
      }
    } else {
      // Yeni ekleme
      try {
        const res = await axios.post("http://localhost:3001/users", formData);
        setUsers([...users, res.data]);
      } catch (err) {
        console.error("Ekleme hatası:", err);
      }
    }

    setFormData({ name: "", email: "" });
  };

  // Kullanıcı sil
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  // Kullanıcıyı düzenleme moduna al
  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditingUser(user);
  };

  return (
    <div>
      <h2>Kullanıcı Listesi</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4 mt-3">
        <div className="row g-2">
          <div className="col-md-5">
            <input
              type="text"
              name="name"
              placeholder="İsim"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              {editingUser ? "Güncelle" : "Ekle"}
            </button>
          </div>
        </div>
      </form>

      {/* Liste */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>İsim</th>
            <th>Email</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(u)}
                >
                  Düzenle
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(u.id)}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
