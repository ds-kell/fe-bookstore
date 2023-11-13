import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";
import AllBook from "./AllBook";

function TabMenuBook() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const handleViewBookClick = () => {
    navigate("/book/view-book");
  };
  const handleViewBookDetailClick = () => {
    navigate("/book/view-book-detail");
  };
  const handleCreateBookClick = () => {
    navigate("/book/create-book");
  };
  const handleProposalClick = () => {
    navigate(`/book/create-proposal`);
  };
  const handlePickingOutClick = () => {
    navigate(`/book/picking-out`);
  };
  const handlePickingInClick = () => {
    navigate(`/book/picking-in`);
  };
  const [currentTab, setCurrentTab] = useState("1");

//   const handleTabClick = (tab) => {
//     setCurrentTab(tab.id);
//     navigate(tab.url);
//   };
  const tabs = [
    {
      id: '1',
      tabTitle: "View book",
      url: "view-book",
      content: "AllBook",
    },
    {
      id: '2',
      tabTitle: "Create book",
      url: "view-book",
      content: "AllBook",
    },
    {
      id: '3',
      tabTitle: "Create proposal",
      url: "view-book",
      content: "AllBook",
    },
    {
      id: '4',
      tabTitle: "Picking in",
      url: "view-book",
      content: "AllBook",
    },
    {
      id: '5',
      tabTitle: "Picking out",
      url: "view-book",
      content: "AllBook",
    },
  ];
  return (
    <div className="body container">
      <div className="tab-inline">
        <div className="tab-item" onClick={() => handleViewBookClick()}>
          View book
        </div>
        <div className="tab-item" onClick={() => handleCreateBookClick()}>
          Create book
        </div>
        <div className="tab-item" onClick={() => handleProposalClick()}>
          Create proposal
        </div>
        <div className="tab-item" onClick={() => handlePickingOutClick()}>
          Picking out
        </div>
        <div className="tab-item" onClick={() => handlePickingInClick()}>
          Picking in
        </div>
        {/* {tabs.map((tab, i) => (
          <div
            className="tab-item"
            key={tab.id}
            id={tab.id}
            disabled={currentTab === `${tab.id}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.tabTitle}
          </div>
        ))}
      </div>
      <div className="content">
        {tabs.map((tab, i) => (
          <div key={i}>
            {currentTab === `${tab.id}` && (
              <div>
               bbbb
              </div>
            )}
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default TabMenuBook;
