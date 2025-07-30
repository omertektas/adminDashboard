import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });
  const [editingId, setEditingId] = useState(null); // düzenlenen ürün ID'si

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3001/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // düzenleme işlemi
      await axios.put(`http://localhost:3001/products/${editingId}`, {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      });
    } else {
      // ekleme işlemi
      await axios.post("http://localhost:3001/products", {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      });
    }

    setNewProduct({ name: "", price: "", stock: "" });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    setEditingId(product.id);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3001/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="container mt-4">
      <h2>Ürünler</h2>
      {/* Ürün Ekle / Güncelle Formu */}
      <form className="row g-3 mt-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Ürün adı"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="form-control"
            placeholder="Fiyat"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            className="form-control"
            placeholder="Stok"
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Güncelle" : "Ekle"}
          </button>
        </div>
      </form>

      {/* Ürün Listesi */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Fiyat</th>
            <th>Stok</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price} ₺</td>
              <td>{item.stock}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(item)}
                >
                  Düzenle
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteProduct(item.id)}
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

export default Products;
