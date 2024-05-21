import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { UserProvider } from "./context/user.context.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import Employees from "./component/Employees.jsx";
import { EmployeeProvider } from "./context/employee.context.jsx";
import CreateEmployee from "./component/CreateEmployee.jsx";
import EditEmployee from "./component/EditEmployee.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <EmployeeProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/list" element={<Employees />} />
            <Route path="/create" element={<CreateEmployee />} />
            <Route path="/edit/:id" element={<EditEmployee />} />
          </Routes>
        </EmployeeProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
