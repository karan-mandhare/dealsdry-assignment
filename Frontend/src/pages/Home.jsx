import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  return (
    <div>
      <Header />
      <div>
        <div className="bg-yellow-300 p-2">
          <h3>Dashboard</h3>
        </div>
        <div className="flex items-center justify-center h-[80vh]">
          <h1 className="text-4xl font-bold">Welcome Admin Panel</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
