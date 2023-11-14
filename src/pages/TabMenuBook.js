import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";

function TabMenuBook() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("1");
  const tabs = [
    {
      id: "1",
      tabTitle: "View book",
      url: "/book/view-book",
      bgcolor: "#6A2A4B",
      color: "#ffffff"
    },
    {
      id: "2",
      tabTitle: "Create book",
      url: "/book/create-book",
      bgcolor: "#6A2A4B",
      color: "#ffffff"
    },
    {
      id: "3",
      tabTitle: "Create proposal",
      url: "/book/create-proposal",
      bgcolor: "#6A2A4B",
      color: "#ffffff"
    },
    {
      id: "4",
      tabTitle: "Picking in",
      url: "/book/picking-in",
      bgcolor: "#6A2A4B",
      color: "#ffffff"
    },
    {
      id: "5",
      tabTitle: "Picking out",
      url: "/book/picking-out",
      bgcolor: "#6A2A4B",
      color: "#ffffff"
    },
  ];
  const handleTabClick = (tab) => {
    setCurrentTab(tab.id);
    navigate(tab.url);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div className="tab-inline">
            {tabs.map((tab, i) => (
              <div
                key={i}
                className="tab-item"
                style={{
                  backgroundColor: currentTab === tab.id ? tab.bgcolor : undefined,
                  color: currentTab === tab.id ? tab.color : undefined,

                }}
                onClick={() => handleTabClick(tab)}
              >
                {tab.tabTitle}
              </div>
            ))}
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
