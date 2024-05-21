import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/user.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post("/api/user/login", {
        username,
        password,
      });

      if (responce?.data) {
        toast.success(responce.data.message);
        setUser(responce.data?.user[0]);
        // const accessToken =
        navigate("/home");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleSignUp = async () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-2 bg-yellow-300 w-full">
        <div className="flex justify-between">
          <div className="w-[95%]">
            <h3 className="text-2xl text-center">Login Page</h3>
          </div>
          <div>
            <button className="mr-2" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="mt-16 text-2xl">
            <div className="m-2 p-2 flex items-center">
              <label htmlFor="username" className="w-32">
                Username :
              </label>
              <input
                type="text"
                id="username"
                className="border-2 flex-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="m-2 p-2 flex items-center">
              <label htmlFor="password" className="w-32">
                Password :
              </label>
              <input
                type="password"
                id="password"
                className="border-2 flex-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="m-4 p-4 text-center">
              <button
                type="submit"
                className="border-2 px-4 py-2 rounded-lg bg-green-300 w-[150px]"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
