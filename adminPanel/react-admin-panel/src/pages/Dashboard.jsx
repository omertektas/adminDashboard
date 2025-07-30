import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await axios.get("http://localhost:3001/users");
      const productRes = await axios.get("http://localhost:3001/products");
      setUsers(userRes.data);
      setProducts(productRes.data);
    };
    fetchData();
  }, []);

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"];

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      {/* Kartlar */}
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card text-bg-primary mb-3 h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Toplam Kullanıcı</h5>
              <p className="card-text fs-4">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-bg-success mb-3 h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Toplam Ürün</h5>
              <p className="card-text fs-4">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-bg-warning mb-3 h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Toplam Stok</h5>
              <p className="card-text fs-4">{totalStock}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-bg-danger mb-3 h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Toplam Ürün Değeri</h5>
              <p className="card-text fs-5">
                {totalValue.toLocaleString("tr-TR")} ₺
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grafikler */}
      <div className="row mt-4">
        {/* Bar Chart: Ürünlerin Stok Miktarı */}
        <div className="col-md-6">
          <h5>Ürün Bazlı Stok Grafiği</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={products}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Ürünlerin Toplam Değere Katkısı */}
        <div className="col-md-6">
          <h5>Ürün Değeri Dağılımı</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={products}
                dataKey={(p) => p.price * p.stock}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {products.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
