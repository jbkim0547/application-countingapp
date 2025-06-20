import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUserName(decoded.unique_name);
      } catch (err) {
        console.log("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName("");
    navigate("/loginSignup");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Job Helper
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/loginSignup">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/count">
                Job Count
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calendar">
                Calendar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jobScript">
                Job Script
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/interviewNote">
                Interview Memo
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <div>
                {userName ? (
                  <>
                    <div className="nav-link" Style="color: white">
                      Hello {userName}
                    </div>
                    <button
                      className="btn btn-outline-light btn-sm"
                      Style="margin-left: 30px; color:red"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <Link className="nav-link" Style="color: white; font-size:20px" to="/loginSignup">
                    Login
                  </Link>
                )}
                !
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
