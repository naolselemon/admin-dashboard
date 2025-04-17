import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";

import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";

import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Make SignIn the default route */}
        {/* <Route index path="/" element={<Navigate to="/signin" replace />} /> */}

        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/blank" element={<Blank />} /> */}

          {/* Forms */}
          <Route path="/form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="/basic-tables" element={<BasicTables />} />

          {/* Ui Elements
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/buttons" element={<Buttons />} /> */}

          {/* Charts */}
          {/* <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} /> */}
        </Route>

        {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
