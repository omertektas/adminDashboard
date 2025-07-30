import { Outlet, NavLink } from "react-router-dom";

function Layout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Admin Panel</span>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside className="bg-light border-end" style={{ width: 240 }}>
          <ul className="nav flex-column p-3">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/users" className="nav-link">Kullanıcılar</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className="nav-link">Ürünler</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/settings" className="nav-link">Ayarlar</NavLink>
            </li>
          </ul>
        </aside>

        {/* İçerik */}
        <main className="flex-grow-1 py-4 px-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
