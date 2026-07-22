import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Invoices from "./pages/Invoices";
import EmiManage from "./pages/EmiManage";
import Reports from "./pages/Reports";
import RevenueExp from "./pages/RevenueExp";
import Settings from './pages/Settings';
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  // Layout
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "invoices",
        element: <Invoices />,
      },
      {
        path: "emi",
        element: <EmiManage />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="min-h-screen bg-zinc-600">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;