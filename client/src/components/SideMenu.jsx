import React from "react";
import {
  LayoutDashboard,
  Bike,
  Users,
  ShoppingCart,
  Receipt,
  Wallet,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/home",
  },
  {
    title: "Inventory",
    icon: Bike,
    path: "/home/inventory",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/home/customer",
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    path: "/home/sales",
  },
  {
    title: "Invoices",
    icon: Receipt,
    path: "/home/invoices",
  },
  {
    title: "EMI Management",
    icon: CreditCard,
    path: "/home/emi",
  },
  {
    title: "Revenue & Expenses",
    icon: Wallet,
    path: "/home/revenue",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/home/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/home/settings",
  },
];

const SideMenu = ({ className }) => {
  return (
    <aside className={className}>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <Bike className="text-blue-400" size={30} />

        <div>
          <h1 className="text-xl font-bold text-blue-400">
            Farooq Motors
          </h1>

          <p className="text-xs text-gray-400">
            Bike Showroom
          </p>
        </div>
      </div>

      {/* Menu */}
      <p className="text-xs uppercase text-gray-500 mb-3">
        Main Menu
      </p>

      <ul className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/home"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideMenu;