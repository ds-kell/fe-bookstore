import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";

function TabMenuBook() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";
  const isManager = role === "MANAGER";
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("1");
  const tabs = [
    {
      id: "1",
      tabTitle: "View book",
      url: "/book/view-book",
      bgcolor: "#6A2A4B",
      color: "#ffffff",
      visible: true,
    },
    {
      id: "2",
      tabTitle: "Create book",
      url: "/book/create-book",
      bgcolor: "#6A2A4B",
      color: "#ffffff",
      visible: isAdmin,
    },
    {
      id: "3",
      tabTitle: "Create proposal",
      url: "/book/create-proposal",
      bgcolor: "#6A2A4B",
      color: "#ffffff",
      visible: isManager,
    },
    {
      id: "4",
      tabTitle: "Picking in",
      url: "/book/picking-in",
      bgcolor: "#6A2A4B",
      color: "#ffffff",
      visible: isManager,
    },
    {
      id: "5",
      tabTitle: "Picking out",
      url: "/book/picking-out",
      bgcolor: "#6A2A4B",
      color: "#ffffff",
      visible: !isAdmin,
    },
    {
      id: "6",
      tabTitle: "Category",
      url: "/book/category",
      bgcolor: "#6A2A4B",
      color: "#ffffff",
      visible: isAdmin || isManager,
    },
  ];

  const handleTabClick = (tab) => {
    setCurrentTab(tab.id);
    navigate(tab.url);
  };

  return (
    <div className="">
      <div className="row">
        <div className="">
          <div className="tab-inline">
            {tabs.map(
              (tab, i) =>
                tab.visible && (
                  <div
                    key={i}
                    className="tab-item"
                    style={{
                      backgroundColor:
                        currentTab === tab.id ? tab.bgcolor : undefined,
                      color: currentTab === tab.id ? tab.color : undefined,
                    }}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab.tabTitle}
                  </div>
                )
            )}
          </div>
          <div className="tab-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabMenuBook;
