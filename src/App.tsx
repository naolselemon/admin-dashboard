import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { account } from "./appwrite/config";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { ToastContainer } from "react-toastify";


// import SignUp from "./pages/AuthPages/SignUp";
// import Avatars from "./pages/UiElements/Avatars";
// import Buttons from "./pages/UiElements/Buttons";
// import LineChart from "./pages/Charts/LineChart";
// import BarChart from "./pages/Charts/BarChart";
// import Blank from "./pages/Blank";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({redirectPath = "/signin"}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async ()=>{
      try{
        const user =  await account.get();
        const isAdmin = user.labels?.includes("admin");
        setIsAuthenticated(isAdmin);
      }catch(error){
        console.error("Auth check failed", error);
        setIsAuthenticated(false)
      }
    }
    checkAuth();
  }, [])

  if (isAuthenticated == null){
    return <div>Loading...</div>
  }

  if(!isAuthenticated){
    return <Navigate to={redirectPath} state={{from: location }} replace />
  }

  return <Outlet /> //rendering protected  routes.
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
         {/*Public Routes*/ }
         <Route path="/signin" element={<SignIn/>} />
         {/* Protected Routes under AppLayout*/}
         <Route element={<ProtectedRoute/>}>
          <Route element={<AppLayout/>}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/form-elements" element={<FormElements/>}/>
            <Route path="/basic-tables" element={<BasicTables/>}/>
          </Route>
         </Route>

          {/* Default Route */}
         <Route index path="/" element={<Navigate to="/signin"  replace/>}/>

         {/*Fallback Route */}
         <Route path="*" element={< NotFound/>}/>
      </Routes>
    </Router>
  );
}
