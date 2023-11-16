import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";

const EditProposalRq = ({ data }) => {
  const accessToken = localStorage.getItem("token");
  let config = {};

  const [proposalRequest, setProposalRequest] = useState({
    date: new Date().toISOString(),
    listBookRq: Array.from({ length: data.length }, () => ({
      idBook: 0,
      quantity: 1,
    })),
  });

  useEffect(() => {
    setProposalRequest((prevState) => ({
      ...prevState,
      listBookRq: data.map((item) => ({
        idBook: item.id,
        quantity: 1,
      })),
    }));
  }, [data]);

  const handleQuantityChange = (index, value) => {
    const intValue = parseInt(value, 10);

    if (!isNaN(intValue)) {
      const updatedDetails = [...proposalRequest.listBookRq];
      updatedDetails[index].quantity = intValue;

      setProposalRequest({
        ...proposalRequest,
        listBookRq: updatedDetails,
      });
    }
  };
  const handleSubmit = async () => {
    try {
      config = {
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
      };
      console.log(proposalRequest);
      const response = await axios.post(
        "http://localhost:8088/api/private/proposal/create-proposal",
        proposalRequest,
        config
      );
      console.log(response.data);
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
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Quantity"
                      defaultValue={1}
                      min={1}
                      value={proposalRequest.listBookRq[index]?.quantity || ""}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          e.target.value,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
export default EditProposalRq;
