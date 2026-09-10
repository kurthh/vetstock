import { useState } from "react";
import "./App.css";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    const [activePage, setActivePage] = useState("dashboard");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const menuItems = [
        {
            title: "MAIN",
            items: [
                { id: "dashboard", icon: "fa-solid fa-chart-line", label: "Dashboard" },
                { id: "inventory", icon: "fa-solid fa-boxes-stacked", label: "Inventory" },
                { id: "transactions", icon: "fa-solid fa-right-left", label: "Stock Transactions" },
            ],
        },
        {
            title: "MANAGEMENT",
            items: [
                { id: "health-records", icon: "fa-solid fa-notes-medical", label: "Health Records" },
                { id: "forecast", icon: "fa-solid fa-chart-column", label: "Demand Forecast" },
                { id: "reports", icon: "fa-solid fa-file-lines", label: "Reports" },
                { id: "notifications", icon: "fa-solid fa-bell", label: "Notifications" },
            ],
        },
    ];

    const pageTitles = {
        dashboard: {
            title: "Dashboard",
            subtitle: "Veterinary Inventory Management System",
        },
        inventory: {
            title: "Inventory",
            subtitle: "Manage medicines and veterinary supplies",
        },
        transactions: {
            title: "Stock Transactions",
            subtitle: "Monitor stock in and stock out transactions",
        },
        "health-records": {
            title: "Health Records",
            subtitle: "Manage veterinary health records",
        },
        forecast: {
            title: "Demand Forecast",
            subtitle: "Predict future medicine demand",
        },
        reports: {
            title: "Reports",
            subtitle: "Generate inventory and transaction reports",
        },
        notifications: {
            title: "Notifications",
            subtitle: "View system alerts and notifications",
        },
    };

    function handleLogin(event) {
        event.preventDefault();

        if (username === "admin" && password === "admin123") {
            setLoggedIn(true);
            setLoginError(false);
        } else {
            setLoginError(true);
        }
    }

    function handleLogout() {
        setLoggedIn(false);
        setUsername("");
        setPassword("");
        setLoginError(false);
    }

    function showPage(pageId) {
        setActivePage(pageId);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    function toggleSidebar() {
        setSidebarCollapsed(!sidebarCollapsed);
    }

    if (!loggedIn) {
        return (
            <div className="login-page">
                <form className="login-box" onSubmit={handleLogin}>
                    <div className="login-logo">
                        <i className="fa-solid fa-paw"></i>
                    </div>

                    <h1>VetStock</h1>

                    <p>
                        Veterinary Inventory Management System
                    </p>

                    <div className="login-input">
                        <i className="fa-solid fa-user"></i>

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                    <div className="login-input">
                        <i className="fa-solid fa-lock"></i>

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>

                    {loginError && (
                        <p
                            className="login-error"
                            style={{ display: "block" }}
                        >
                            Invalid username or password.
                        </p>
                    )}
                </form>
            </div>
        );
    }

    return (
        <div className="app">

            {/* SIDEBAR */}
            <aside
                id="sidebar"
                className={`sidebar ${
                    sidebarCollapsed ? "collapsed" : ""
                }`}
            >
                <div className="logo">
                    <i className="fa-solid fa-paw"></i>

                    <div>
                        <h2>VetStock</h2>
                        <span>Veterinary System</span>
                    </div>
                </div>

                <div className="menu">

                    {menuItems.map((section) => (
                        <div key={section.title}>

                            <div className="menu-title">
                                {section.title}
                            </div>

                            {section.items.map((item) => (
                                <button
                                    key={item.id}
                                    className={`menu-item ${
                                        activePage === item.id
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => showPage(item.id)}
                                >
                                    <i className={item.icon}></i>

                                    <span>{item.label}</span>

                                    {item.id === "notifications" && (
                                        <span className="notification-count">
                                            3
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    ))}

                </div>

                <div className="sidebar-bottom">

                    <div className="user-profile">

                        <div className="avatar">
                            AD
                        </div>

                        <div>
                            <strong>Admin</strong>
                            <small>Administrator</small>
                        </div>

                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        &nbsp; Logout
                    </button>

                </div>
            </aside>


            {/* MAIN */}
            <main
                className={`main ${
                    sidebarCollapsed ? "expanded" : ""
                }`}
            >

                {/* TOPBAR */}
                <header className="topbar">

                    <button
                        className="sidebar-toggle"
                        onClick={toggleSidebar}
                    >
                        <i
                            className={
                                sidebarCollapsed
                                    ? "fa-solid fa-chevron-right"
                                    : "fa-solid fa-chevron-left"
                            }
                        ></i>
                    </button>

                    <div className="page-title">

                        <h1>
                            {pageTitles[activePage].title}
                        </h1>

                        <p>
                            {pageTitles[activePage].subtitle}
                        </p>

                    </div>

                    <div className="top-actions">

                        <button
                            className="icon-button"
                            onClick={() =>
                                showPage("notifications")
                            }
                        >
                            <i className="fa-solid fa-bell"></i>
                            <span>3</span>
                        </button>

                        <div className="top-user">

                            <div className="avatar">
                                AD
                            </div>

                            <div>
                                <strong>Admin</strong>
                                <small>Administrator</small>
                            </div>

                        </div>

                    </div>

                </header>


                {/* CONTENT */}
                <div className="content">

                    {activePage === "dashboard" && (
                        <Dashboard
                            showPage={showPage}
                        />
                    )}

                    {activePage === "inventory" && (
                        <Inventory />
                    )}

                    {activePage === "transactions" && (
                        <Transactions />
                    )}

                    {activePage === "health-records" && (
                        <HealthRecords />
                    )}

                    {activePage === "forecast" && (
                        <Forecast />
                    )}

                    {activePage === "reports" && (
                        <Reports />
                    )}

                    {activePage === "notifications" && (
                        <Notifications />
                    )}

                </div>

            </main>

        </div>
    );
}


/* ================= DASHBOARD ================= */

function Dashboard({ showPage }) {

    return (
        <div className="page active-page">

            <div className="welcome">

                <div>
                    <h2>Good day, Admin!</h2>

                    <p>
                        Here's what's happening with your
                        veterinary inventory today.
                    </p>
                </div>

                <button
                    className="primary-btn"
                    onClick={() => showPage("inventory")}
                >
                    <i className="fa-solid fa-plus"></i>
                    &nbsp; Add Inventory
                </button>

            </div>


            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-icon blue">
                        <i className="fa-solid fa-boxes-stacked"></i>
                    </div>

                    <div>
                        <span>Total Items</span>
                        <h2>248</h2>
                        <small>+12 this month</small>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon green">
                        <i className="fa-solid fa-box-open"></i>
                    </div>

                    <div>
                        <span>Stock In</span>
                        <h2>86</h2>
                        <small>This month</small>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon yellow">
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    </div>

                    <div>
                        <span>Stock Out</span>
                        <h2>54</h2>
                        <small>This month</small>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon red">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>

                    <div>
                        <span>Low Stock</span>
                        <h2>12</h2>
                        <small>Needs attention</small>
                    </div>

                </div>

            </div>


            <div className="dashboard-grid">

                {/* STOCK LEVEL */}
                <div className="card">

                    <div className="card-header">

                        <div>
                            <h3>Stock Level Overview</h3>

                            <p>
                                Current inventory status
                            </p>
                        </div>

                        <button
                            className="view-btn"
                            onClick={() =>
                                showPage("inventory")
                            }
                        >
                            View Inventory
                        </button>

                    </div>


                    <div className="progress-item">

                        <div>
                            <span>Medicines</span>
                            <strong>85%</strong>
                        </div>

                        <div className="progress">
                            <div
                                className="progress-bar green-bar"
                                style={{ width: "85%" }}
                            ></div>
                        </div>

                    </div>


                    <div className="progress-item">

                        <div>
                            <span>Vaccines</span>
                            <strong>65%</strong>
                        </div>

                        <div className="progress">
                            <div
                                className="progress-bar yellow-bar"
                                style={{ width: "65%" }}
                            ></div>
                        </div>

                    </div>


                    <div className="progress-item">

                        <div>
                            <span>Supplies</span>
                            <strong>42%</strong>
                        </div>

                        <div className="progress">
                            <div
                                className="progress-bar red-bar"
                                style={{ width: "42%" }}
                            ></div>
                        </div>

                    </div>

                </div>


                {/* ALERTS */}
                <div className="card">

                    <div className="card-header">

                        <div>
                            <h3>Inventory Alerts</h3>

                            <p>
                                Items that need attention
                            </p>
                        </div>

                        <button
                            className="view-btn"
                            onClick={() =>
                                showPage("notifications")
                            }
                        >
                            View All
                        </button>

                    </div>


                    <div className="alert-item danger">

                        <i className="fa-solid fa-circle-exclamation"></i>

                        <div>
                            <strong>Low Stock</strong>

                            <p>
                                Amoxicillin 500mg is below
                                minimum stock level.
                            </p>
                        </div>

                    </div>


                    <div className="alert-item warning">

                        <i className="fa-solid fa-triangle-exclamation"></i>

                        <div>
                            <strong>Expiring Soon</strong>

                            <p>
                                5 medicine batches will
                                expire soon.
                            </p>
                        </div>

                    </div>


                    <div className="alert-item info">

                        <i className="fa-solid fa-circle-info"></i>

                        <div>
                            <strong>Stock Update</strong>

                            <p>
                                New vaccine stock was
                                recently added.
                            </p>
                        </div>

                    </div>

                </div>

            </div>


            {/* RECENT TRANSACTIONS */}
            <div className="card table-card">

                <div className="card-header">

                    <div>
                        <h3>Recent Stock Transactions</h3>

                        <p>
                            Latest inventory movements
                        </p>
                    </div>

                    <button
                        className="view-btn"
                        onClick={() =>
                            showPage("transactions")
                        }
                    >
                        View All
                    </button>

                </div>


                <div className="table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Medicine</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Staff</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td>Sep 02, 2026</td>
                                <td>Amoxicillin 500mg</td>
                                <td>
                                    <span className="stock-in">
                                        Stock In
                                    </span>
                                </td>
                                <td>50</td>
                                <td>Admin</td>
                            </tr>

                            <tr>
                                <td>Sep 02, 2026</td>
                                <td>Vitamin B Complex</td>
                                <td>
                                    <span className="stock-out">
                                        Stock Out
                                    </span>
                                </td>
                                <td>10</td>
                                <td>Dr. Santos</td>
                            </tr>

                            <tr>
                                <td>Sep 01, 2026</td>
                                <td>Rabies Vaccine</td>
                                <td>
                                    <span className="stock-in">
                                        Stock In
                                    </span>
                                </td>
                                <td>30</td>
                                <td>Admin</td>
                            </tr>

                            <tr>
                                <td>Sep 01, 2026</td>
                                <td>Paracetamol</td>
                                <td>
                                    <span className="stock-out">
                                        Stock Out
                                    </span>
                                </td>
                                <td>8</td>
                                <td>Dr. Reyes</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}


/* ================= INVENTORY ================= */

function Inventory() {

    const [search, setSearch] = useState("");

    const medicines = [
        ["MED-001", "Amoxicillin 500mg", "Antibiotic", "50", "20", "2027-05-10", "Good"],
        ["MED-002", "Rabies Vaccine", "Vaccine", "30", "10", "2027-01-15", "Good"],
        ["MED-003", "Vitamin B Complex", "Supplement", "18", "20", "2026-12-05", "Low Stock"],
        ["MED-004", "Paracetamol", "Medicine", "8", "15", "2028-03-20", "Low Stock"],
        ["MED-005", "Deworming Tablet", "Medicine", "75", "25", "2027-08-12", "Good"],
    ];

    const filteredMedicines = medicines.filter((medicine) =>
        medicine.join(" ").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page active-page">

            <div className="section-header">

                <div>
                    <h2>Inventory</h2>
                    <p>
                        Manage medicines and veterinary supplies
                    </p>
                </div>

                <button className="primary-btn">
                    <i className="fa-solid fa-plus"></i>
                    &nbsp; Add Inventory
                </button>

            </div>


            <div className="toolbar">

                <input
                    type="text"
                    placeholder="Search inventory..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

                <select>
                    <option>All Categories</option>
                    <option>Medicine</option>
                    <option>Antibiotic</option>
                    <option>Vaccine</option>
                    <option>Supplement</option>
                </select>

                <select>
                    <option>All Status</option>
                    <option>Good</option>
                    <option>Low Stock</option>
                </select>

            </div>


            <div className="card table-card">

                <div className="table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Medicine</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Minimum</th>
                                <th>Expiration</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredMedicines.map((medicine) => (

                                <tr key={medicine[0]}>

                                    <td>{medicine[0]}</td>

                                    <td>
                                        <strong>{medicine[1]}</strong>
                                    </td>

                                    <td>{medicine[2]}</td>

                                    <td>{medicine[3]}</td>

                                    <td>{medicine[4]}</td>

                                    <td>{medicine[5]}</td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                medicine[6] === "Good"
                                                    ? "success-badge"
                                                    : "warning-badge"
                                            }`}
                                        >
                                            {medicine[6]}
                                        </span>

                                    </td>

                                    <td>

                                        <button className="action-btn">
                                            <i className="fa-solid fa-pen"></i>
                                        </button>

                                        <button className="action-btn">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}


/* ================= TRANSACTIONS ================= */

function Transactions() {

    return (
        <div className="page active-page">

            <div className="section-header">

                <div>
                    <h2>Stock Transactions</h2>

                    <p>
                        Monitor all stock movements
                    </p>
                </div>

                <button className="primary-btn">
                    <i className="fa-solid fa-plus"></i>
                    &nbsp; New Transaction
                </button>

            </div>


            <div className="toolbar">

                <input
                    type="text"
                    placeholder="Search transactions..."
                />

                <select>
                    <option>All Transaction Types</option>
                    <option>Stock In</option>
                    <option>Stock Out</option>
                </select>

            </div>


            <div className="card table-card">

                <div className="table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Medicine</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Staff</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td>TRX-001</td>
                                <td>Sep 02, 2026</td>
                                <td>Amoxicillin 500mg</td>
                                <td>
                                    <span className="stock-in">
                                        Stock In
                                    </span>
                                </td>
                                <td>50</td>
                                <td>Admin</td>
                            </tr>

                            <tr>
                                <td>TRX-002</td>
                                <td>Sep 02, 2026</td>
                                <td>Vitamin B Complex</td>
                                <td>
                                    <span className="stock-out">
                                        Stock Out
                                    </span>
                                </td>
                                <td>10</td>
                                <td>Dr. Santos</td>
                            </tr>

                            <tr>
                                <td>TRX-003</td>
                                <td>Sep 01, 2026</td>
                                <td>Rabies Vaccine</td>
                                <td>
                                    <span className="stock-in">
                                        Stock In
                                    </span>
                                </td>
                                <td>30</td>
                                <td>Admin</td>
                            </tr>

                            <tr>
                                <td>TRX-004</td>
                                <td>Sep 01, 2026</td>
                                <td>Paracetamol</td>
                                <td>
                                    <span className="stock-out">
                                        Stock Out
                                    </span>
                                </td>
                                <td>8</td>
                                <td>Dr. Reyes</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}


/* ================= HEALTH RECORDS ================= */

function HealthRecords() {

    return (
        <div className="page active-page">

            <div className="section-header">

                <div>
                    <h2>Health Records</h2>

                    <p>
                        Manage veterinary health records
                    </p>
                </div>

                <button className="primary-btn">
                    <i className="fa-solid fa-plus"></i>
                    &nbsp; Add Record
                </button>

            </div>


            <div className="toolbar">

                <input
                    type="text"
                    placeholder="Search patient or owner..."
                />

            </div>


            <div className="card table-card">

                <div className="table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Record ID</th>
                                <th>Patient</th>
                                <th>Species</th>
                                <th>Owner</th>
                                <th>Diagnosis</th>
                                <th>Veterinarian</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td>REC-001</td>
                                <td>Max</td>
                                <td>Dog</td>
                                <td>Juan Dela Cruz</td>
                                <td>Skin Allergy</td>
                                <td>Dr. Santos</td>
                            </tr>

                            <tr>
                                <td>REC-002</td>
                                <td>Luna</td>
                                <td>Cat</td>
                                <td>Maria Reyes</td>
                                <td>Fever</td>
                                <td>Dr. Reyes</td>
                            </tr>

                            <tr>
                                <td>REC-003</td>
                                <td>Buddy</td>
                                <td>Dog</td>
                                <td>Pedro Garcia</td>
                                <td>Vaccination</td>
                                <td>Dr. Santos</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}


/* ================= FORECAST ================= */


function Forecast() {
    const [forecastGenerated, setForecastGenerated] = useState(false);

    const forecastData = [
        {
            medicine: "Amoxicillin 500mg",
            currentStock: 50,
            predictedDemand: 42,
            recommendation: "Sufficient Stock",
        },
        {
            medicine: "Rabies Vaccine",
            currentStock: 30,
            predictedDemand: 35,
            recommendation: "Restock Needed",
        },
        {
            medicine: "Vitamin B Complex",
            currentStock: 18,
            predictedDemand: 25,
            recommendation: "Restock Needed",
        },
        {
            medicine: "Paracetamol",
            currentStock: 8,
            predictedDemand: 12,
            recommendation: "Restock Needed",
        },
        {
            medicine: "Deworming Tablet",
            currentStock: 75,
            predictedDemand: 55,
            recommendation: "Sufficient Stock",
        },
    ];

    return (
        <div className="page active-page">

            <div className="section-header">

                <div>
                    <h2>Demand Forecast</h2>

                    <p>
                        Predict future medicine demand
                    </p>
                </div>

                <button
                    className="primary-btn"
                    onClick={() => setForecastGenerated(true)}
                >
                    <i className="fa-solid fa-rotate"></i>
                    &nbsp; Generate Forecast
                </button>

            </div>

            {!forecastGenerated ? (

                <div className="forecast-card">

                    <div className="forecast-placeholder">

                        <i className="fa-solid fa-chart-column"></i>

                        <h3>
                            Demand Forecast
                        </h3>

                        <p>
                            Click "Generate Forecast" to view
                            predicted medicine demand.
                        </p>

                    </div>

                </div>

            ) : (

                <div className="card table-card">

                    <div className="card-header">

                        <div>
                            <h3>Prediction Results</h3>

                            <p>
                                Estimated future medicine demand
                            </p>
                        </div>

                    </div>

                    <div className="table-container">

                        <table>

                            <thead>
                                <tr>
                                    <th>Medicine</th>
                                    <th>Current Stock</th>
                                    <th>Predicted Demand</th>
                                    <th>Prediction Status</th>
                                    <th>Recommendation</th>
                                </tr>
                            </thead>

                            <tbody>

                                {forecastData.map((item) => (

                                    <tr key={item.medicine}>

                                        <td>
                                            <strong>
                                                {item.medicine}
                                            </strong>
                                        </td>

                                        <td>
                                            {item.currentStock}
                                        </td>

                                        <td>
                                            {item.predictedDemand} units
                                        </td>

                                        <td>

                                            <span
                                                className={`badge ${
                                                    item.predictedDemand >
                                                    item.currentStock
                                                        ? "warning-badge"
                                                        : "success-badge"
                                                }`}
                                            >
                                                {item.predictedDemand >
                                                item.currentStock
                                                    ? "High Demand"
                                                    : "Normal Demand"}
                                            </span>

                                        </td>

                                        <td>
                                            {item.recommendation}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>
    );
}



/* ================= REPORTS ================= */

function Reports() {

    const reports = [
        {
            icon: "fa-solid fa-boxes-stacked",
            title: "Inventory Report",
            text: "View current inventory levels and stock status.",
        },
        {
            icon: "fa-solid fa-right-left",
            title: "Transaction Report",
            text: "View stock in and stock out transactions.",
        },
        {
            icon: "fa-solid fa-notes-medical",
            title: "Patient Health Report",
            text: "View patient health records and medical history.",
        },
        {
            icon: "fa-solid fa-triangle-exclamation",
            title: "Expiry Report",
            text: "View medicines that are nearing expiration.",
        },
    ];

    return (
        <div className="page active-page">

            <div className="section-header">

                <div>
                    <h2>Reports</h2>

                    <p>
                        Generate system reports
                    </p>
                </div>

            </div>


            <div className="report-grid">

                {reports.map((report) => (

                    <div
                        className="report-card"
                        key={report.title}
                    >

                        <i className={report.icon}></i>

                        <h3>
                            {report.title}
                        </h3>

                        <p>
                            {report.text}
                        </p>

                        <button>
                            <i className="fa-solid fa-file-export"></i>
                            &nbsp; Generate
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}


/* ================= NOTIFICATIONS ================= */

function Notifications() {

    return (
        <div className="page active-page">

            <div className="section-header">

                <div>
                    <h2>Notifications</h2>

                    <p>
                        System alerts and notifications
                    </p>
                </div>

            </div>


            <div className="notification-list">

                <div className="notification danger">

                    <i className="fa-solid fa-circle-exclamation"></i>

                    <div>

                        <strong>
                            Low Stock Alert
                        </strong>

                        <p>
                            Amoxicillin 500mg is below
                            the minimum stock level.
                        </p>

                        <small>
                            Today
                        </small>

                    </div>

                </div>


                <div className="notification warning">

                    <i className="fa-solid fa-triangle-exclamation"></i>

                    <div>

                        <strong>
                            Expiration Warning
                        </strong>

                        <p>
                            Several medicine batches
                            are approaching expiration.
                        </p>

                        <small>
                            Today
                        </small>

                    </div>

                </div>


                <div className="notification">

                    <i className="fa-solid fa-circle-info"></i>

                    <div>

                        <strong>
                            Stock Update
                        </strong>

                        <p>
                            Rabies Vaccine stock has
                            been successfully added.
                        </p>

                        <small>
                            Yesterday
                        </small>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default App;