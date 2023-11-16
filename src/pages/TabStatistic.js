import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";

function TabStatistic() {
    const role = localStorage.getItem("role");
    const isAdmin = role === "ADMIN";
    const isManager = role === "MANAGER";
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState("1");
    const tabs = [
        {
            id: "1",
            tabTitle: "Picking In",
            url: "/statistic/view-picking-in",
            bgcolor: "#6A2A4B",
            color: "#ffffff",
            visible: true,
        },
        {
            id: "2",
            tabTitle: "Picking Out",
            url: "/statistic/view-picking-out",
            bgcolor: "#6A2A4B",
            color: "#ffffff",
            visible: true,
        },
        {
            id: "3",
            tabTitle: "Expense",
            url: "/statistic/expense",
            bgcolor: "#6A2A4B",
            color: "#ffffff",
            visible: true,
        },
        {
            id: "4",
            tabTitle: "Statictic",
            url: "/statistic/statis",
            bgcolor: "#6A2A4B",
            color: "#ffffff",
            visible: true,
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

export default TabStatistic;
