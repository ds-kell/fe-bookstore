import "./staff.css";
import { Button } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineFactory } from "react-icons/md";

const ShowStaff = ({ listStaffs }) => {
  // page
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();
  const handleRowClick = (staffId) => {
    navigate(`/staff/${staffId}`);
  };
  // filter staff.branch.name
  const branches = [
    ...new Set(
      listStaffs
        .filter((staff) => staff.branch)
        .map((staff) => staff.branch.name)
    ),
  ];

  const [selectedBranches, setSelectedBranches] = useState([]);
  const filteredByBranch =
    selectedBranches.length > 0
      ? listStaffs.filter(
          (staff) =>
            staff.branch && selectedBranches.includes(staff.branch.name)
        )
      : listStaffs;

  const currentStaffs = filteredByBranch.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredByBranch.length / itemsPerPage);

  const handleBranchChange = (branch) => {
    const updatedBranches = [...selectedBranches];
    if (updatedBranches.includes(branch)) {
      updatedBranches.splice(updatedBranches.indexOf(branch), 1);
    } else {
      updatedBranches.push(branch);
    }
    setSelectedBranches(updatedBranches);
  };

  const handleCreateStaff = () => {
    navigate("create-staff")
  }
  return (
    <div className="row">
      <div className="col-md-2 filter">
        <div className="filter-branch">
          <div className="filter-title">
            <MdOutlineFactory className="filter-icon" />
            <h5>Branch</h5>
          </div>
          <div className="filter-item">
            {branches.map((branch) => (
              <label key={branch} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedBranches.includes(branch)}
                  onChange={() => handleBranchChange(branch)}
                />
                {branch}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Branch</th>
              <th>Full Name</th>
              <th>Address</th>
              {/* <th>Date of Birth</th> */}
            </tr>
          </thead>
          <tbody>
            {currentStaffs.map((staff) => (
              <tr
                key={staff.id}
                onClick={() => handleRowClick(staff.id)}
                className="table-row"
              >
                <td>{staff.username || ""}</td>
                <td>{staff.email || ""}</td>
                <td>{staff.authorities ? staff.authorities : ""}</td>
                <td>{staff.branch ? staff.branch.name || "" : ""}</td>
                <td>{staff.fullName || ""}</td>
                <td>{staff.address || ""}</td>
                {/* <td>{staff.dob ? new Date(staff.dob).toDateString() : ''}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <Button className="btn-staff" onClick={handleCreateStaff}>Add new staff</Button>
      </div>
    </div>
  );
};

export default ShowStaff;
