import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";

const accessToken = localStorage.getItem("token");
let config = {};

const EditPickingIn = ({ data }) => {
  const [pickingInRequest, setPickingInRequest] = useState({
    total: 0,
    date: new Date().toISOString(),
    note: "",
    pickingInDetailRequests: Array.from({ length: data.length }, () => ({
      idBook: 0,
      quantity: 1,
      total: 0,
    })),
  });

  useEffect(() => {
    setPickingInRequest((prevState) => ({
      ...prevState,
      pickingInDetailRequests: data.map((item) => ({
        idBook: item.id,
        quantity: 1,
        total: item.importPrice,
      })),
    }));
  }, [data]);

  const handleQuantityChange = (index, value) => {
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue)) {
      const updatedDetails = [...pickingInRequest.pickingInDetailRequests];
      updatedDetails[index].quantity = intValue;

      setPickingInRequest({
        ...pickingInRequest,
        pickingInDetailRequests: updatedDetails,
      });
    }
  };

  const handleNoteChange = (event) => {
    setPickingInRequest({
      ...pickingInRequest,
      note: event.target.value,
    });
  };

  const totalAmount = pickingInRequest.pickingInDetailRequests.reduce(
    (total, detail) => total + detail.quantity * detail.total,
    0
  );

  const handleSubmit = async () => {
    const updatedDetailRequests = pickingInRequest.pickingInDetailRequests.map(
      (detail) => ({
        ...detail,
        total: detail.quantity * detail.total,
      })
    );

    const updatedPickingInRequest = {
      ...pickingInRequest,
      pickingInDetailRequests: updatedDetailRequests,
    };

    updatedPickingInRequest.total =
      pickingInRequest.pickingInDetailRequests.reduce(
        (total, detail) => total + detail.quantity * detail.total,
        0
      );
    try {
      config = {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
      };
      const response = await axios.post(
        "http://localhost:8088/api/private/picking-in/create-picking-in",
        updatedPickingInRequest,
        config
      );
      console.log("response", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.importPrice}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="input-number"
                      defaultValue={1}
                      min={1}
                      value={
                        pickingInRequest.pickingInDetailRequests[index]
                          ?.quantity || ""
                      }
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          e.target.value,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </td>
                  <td>
                    {pickingInRequest.pickingInDetailRequests[index]?.total *
                      pickingInRequest.pickingInDetailRequests[index]
                        ?.quantity || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
          <div className="customer-block">
            <textarea
              placeholder="Note"
              value={pickingInRequest.note}
              onChange={handleNoteChange}
            />
          </div>
        </div>
        <div className="total-price">
          <center>Total Amount: {totalAmount}</center>
        </div>
        <div className="edit-picking-out">
          <Button className="btn-antd" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EditPickingIn;
