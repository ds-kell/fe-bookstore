import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";

const accessToken = localStorage.getItem("token");
let config = {}


const EditPickingOut = ({ data }) => {
  const [pickingOutRequest, setPickingOutRequest] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    total: 0,
    date: new Date().toISOString(),
    note: "",
    pickingOutDetailRequests: Array.from({ length: data.length }, () => ({
      idBook: 0,
      quantity: 1,
      total: 0,
    })),
  });

  useEffect(() => {
    setPickingOutRequest((prevState) => ({
      ...prevState,
      pickingOutDetailRequests: data.map((item) => ({
        idBook: item.bookDto.id,
        quantity: 1,
        total: item.bookDto.exportPrice,
      })),
    }));
  }, [data]);

  const handleQuantityChange = (index, value) => {
    const updatedDetails = [...pickingOutRequest.pickingOutDetailRequests];
    updatedDetails[index].quantity = value;

    setPickingOutRequest({
      ...pickingOutRequest,
      pickingOutDetailRequests: updatedDetails,
    });
  };

  const handleCustomerNameChange = (event) => {
    setPickingOutRequest({
      ...pickingOutRequest,
      customerName: event.target.value,
    });
  };

  const handleCustomerPhoneChange = (event) => {
    setPickingOutRequest({
      ...pickingOutRequest,
      customerPhone: event.target.value,
    });
  };

  const handleCustomerEmailChange = (event) => {
    setPickingOutRequest({
      ...pickingOutRequest,
      customerEmail: event.target.value,
    });
  };

  const handleNoteChange = (event) => {
    setPickingOutRequest({
      ...pickingOutRequest,
      note: event.target.value,
    });
  };

  const totalAmount = pickingOutRequest.pickingOutDetailRequests.reduce(
    (total, detail) => total + detail.quantity * detail.total,
    0
  );

  const handleSubmit = async () => {
    const updatedDetailRequests =
      pickingOutRequest.pickingOutDetailRequests.map((detail) => ({
        ...detail,
        total: detail.quantity * detail.total,
      }));

    const updatedPickingOutRequest = {
      ...pickingOutRequest,
      pickingOutDetailRequests: updatedDetailRequests,
    };

    updatedPickingOutRequest.total =
      pickingOutRequest.pickingOutDetailRequests.reduce(
        (total, detail) => total + detail.quantity * detail.total,
        0
      );

    console.log(updatedPickingOutRequest);

    try {
      config = {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
      };
      const response = await axios.post(
        "http://localhost:8088/api/private/picking-out/create-picking-out",
        updatedPickingOutRequest,
        config
      );
      console.log(response.data)
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
                  <td>{item.bookDto.name}</td>
                  <td>{item.bookDto.exportPrice}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="input-number"
                      defaultValue={1}
                      min={1}
                      value={
                        pickingOutRequest.pickingOutDetailRequests[index]
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
                    {pickingOutRequest.pickingOutDetailRequests[index]?.total *
                      pickingOutRequest.pickingOutDetailRequests[index]
                        ?.quantity || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
          <div className="customer-block">
            <input
              type="text"
              placeholder="Customer Name"
              value={pickingOutRequest.customerName}
              onChange={handleCustomerNameChange}
            />
            <input
              type="tel"
              placeholder="Customer Phone"
              value={pickingOutRequest.customerPhone}
              onChange={handleCustomerPhoneChange}
            />
            <input
              type="email"
              placeholder="Customer Email"
              value={pickingOutRequest.customerEmail}
              onChange={handleCustomerEmailChange}
            />
            <textarea
              placeholder="Note"
              value={pickingOutRequest.note}
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
export default EditPickingOut;
