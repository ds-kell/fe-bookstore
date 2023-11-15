import React, { useState } from "react";
import "./staff.css";
import { Button } from "antd";

const ShowStaffInfo = ({ staff }) => {
  const [statusEdit, setStatusEdit] = useState(false);
  const [dob, setDob] = useState(
    new Date(staff.dob).toISOString().slice(0, 10)
  );
  const handleEdit = () => {
    setStatusEdit(!statusEdit);
  };
  const handleUpdate = () => {
    staff.dob = dob;
    setStatusEdit(false);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  return (
    <div className="container">
      <div className="staff-container">
        <div className="row">
          <div className="col-sm-3 col-md-3 col-lg-3"></div>
          <div className="col-sm-3 col-md-6 col-lg-6">
            <div className="profile">
              <label htmlFor="email" className="label-profile">
                Email:
              </label>
              <input
                type="text"
                id="email"
                value={staff.email || "N/A"}
                disabled={!statusEdit}
                className="input-profile"
              />

              <label htmlFor="username" className="label-profile">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={staff.username || "N/A"}
                disabled={!statusEdit}
                className="input-profile"
              />

              <label htmlFor="fullName" className="label-profile">
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                value={staff.fullName || "N/A"}
                disabled={!statusEdit}
                className="input-profile"
              />
              <label htmlFor="roles" className="label-profile">
                Roles:
              </label>
              <input
                type="text"
                id="roles"
                value={staff.authorities ? staff.authorities : "N/A"}
                disabled={!statusEdit}
                className="input-profile"
              />

              <label htmlFor="branch" className="label-profile">
                Branch:
              </label>
              <input
                type="text"
                id="branch"
                value={staff.branch ? staff.branch.name : "N/A"}
                disabled={!statusEdit}
                className="input-profile"
              />
              <label htmlFor="address" className="label-profile">
                Address:
              </label>
              <input
                type="text"
                id="address"
                value={staff.address || "N/A"}
                disabled={!statusEdit}
                className="input-profile"
              />

              <label htmlFor="dob" className="label-profile">
                Date of Birth:
              </label>
              <input
                type="text"
                id="dob"
                value={staff.dob ? new Date(staff.dob).toDateString() : "N/A"}
                disabled={!statusEdit}
                className="input-profile"
              />
            </div>
            <div className="btn-staff">
              <Button className="btn-staff-profile" onClick={handleEdit}>
                {statusEdit ? "Cancel" : "Edit"}
              </Button>
              <Button
                className="btn-staff-profile"
                disabled={!statusEdit}
                onClick={handleUpdate}
                htmlType="submit"
              >
                Save
              </Button>
            </div>
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3"></div>
        </div>
      </div>
    </div>
  );
};

export default ShowStaffInfo;
