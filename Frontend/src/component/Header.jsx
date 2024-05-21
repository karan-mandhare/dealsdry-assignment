import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const responce = await axios.post("/api/user/logout");
      if (!responce) {
        toast.error("Unable to logout");
      }
      toast.success(responce.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <nav>
        <ul className="flex justify-around bg-slate-300 p-2">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/list">Employee List</Link>
          </li>
          <li>
            <Link to="/home">{user?.name} -</Link>
          </li>
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
