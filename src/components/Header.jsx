import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const email = JSON.parse(localStorage.getItem("user"))?.user?.email;
  const logout = () => {
    localStorage.removeItem("user");
    nav("/login");
  };
  return (
    <header>
      <img
        src="https://spencil.vn/wp-content/uploads/2024/08/mau-thiet-ke-logo-yoga-SPencil-Agency-6.jpg"
        alt=""
      />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/products">Shop</Link>
        </li>
        {email ? (
          <li>
            <button onClick={logout}>
              HELLO {email} <p className="btn btn-info">Logout</p>
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </header>
  );
}
