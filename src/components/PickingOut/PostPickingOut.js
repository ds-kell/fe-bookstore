import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";

import { Button } from "antd";

import './pickingout.css'
function PostPickingOut() {
    const [bookDetail, setBookDetail] = useState();
    const { bookDetailId } = useParams();
    const accessToken = localStorage.getItem("token");
    let config = {}
    useEffect(() => {
        async function fetchData() {
            if (accessToken) {
                config = {
                    method: "GET",
                    headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
                };

                try {
                    const response = await axios.get(`http://localhost:8088/api/private/book/detail/${bookDetailId}`, config);
                    const loadedBookDetail = response.data.data;
                    setPickingOutRequest({
                        ...pickingOutRequest,
                        pickingOutDetailRequests: [
                            {
                                idBook: loadedBookDetail.bookDto.id,
                                quantity: 1,
                                total: loadedBookDetail.bookDto.exportPrice,
                            },
                        ],
                    });
                    setBookDetail(loadedBookDetail);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            } else {
                console.log("No access token found.");
            }
        }
        fetchData();
    }, [bookDetailId, accessToken]);

    const [pickingOutRequest, setPickingOutRequest] = useState({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        total: 0,
        date: new Date().toISOString(),
        note: "",
        pickingOutDetailRequests: [
            {
                idBook: 0,
                quantity: 1,
                total: 0,
            },
        ],
    });


    useEffect(() => {
        const calculateTotal = () => {
            const total = pickingOutRequest.pickingOutDetailRequests.reduce((acc, item) => {
                return item.quantity * item.total;
            }, 0);
            setPickingOutRequest({ ...pickingOutRequest, total });
        };
    
        calculateTotal();
    }, [pickingOutRequest.pickingOutDetailRequests]);

    const handleDetailChange = (index, field, value) => {
        const newPickingOutDetails = [...pickingOutRequest.pickingOutDetailRequests];
        newPickingOutDetails[index][field] = value;
    
        const newTotal = newPickingOutDetails.reduce(
          (acc, detail) => acc + detail.quantity * detail.total,
          0
        );
    
        setPickingOutRequest({
          ...pickingOutRequest,
          pickingOutDetailRequests: newPickingOutDetails,
          total: newTotal,
        });
      };

    
    const handleChange = (field, value) => {
        setPickingOutRequest({
            ...pickingOutRequest,
            [field]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            config = {
                method: "POST",
                headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
            };
            console.log(pickingOutRequest);
            // const response = await axios.post("http://localhost:8088/api/private/picking-out/create-picking-out", pickingOutRequest, config);

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                    <div className="book-details">
                        {bookDetail ? (
                            bookDetail &&
                            <div>
                                <h2>{bookDetail.bookDto.name}</h2>
                                <p>Import price: {bookDetail.bookDto.importPrice}</p>
                                <p>Export price: {bookDetail.bookDto.exportPrice}</p>
                                <p>Quantity: {bookDetail.quantity}</p>
                                <p>Category: {bookDetail.bookDto.categoryDto.name}</p>
                                <p>Branch: {bookDetail.branchDto.name}</p>
                                <p>Address: {bookDetail.branchDto.address}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}

                    </div>
                </div>
                <div className="col-md-4">
                    <div className="picking-block">
                        <input
                            type="text"
                            placeholder="Customer Name"
                            value={pickingOutRequest.customerName}
                            onChange={(e) => handleChange("customerName", e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Customer Phone"
                            value={pickingOutRequest.customerPhone}
                            onChange={(e) => handleChange("customerPhone", e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Customer Email"
                            value={pickingOutRequest.customerEmail}
                            onChange={(e) => handleChange("customerEmail", e.target.value)}
                        />
                        <textarea
                            placeholder="Note"
                            value={pickingOutRequest.note}
                            onChange={(e) => handleChange("note", e.target.value)}
                        ></textarea>

                        {pickingOutRequest.pickingOutDetailRequests.map((detail, index) => (
                            <div key={index}>
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    min={1}
                                    value={detail.quantity}
                                    onChange={(e) => handleDetailChange(index, "quantity", parseInt(e.target.value, 10))}
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={detail.total}
                                    disabled
                                    // onChange={(e) => handleDetailChange(index, "price", parseFloat(e.target.value))}
                                />
                            </div>
                        ))}

                        <div className="btn-picking-out">
                            <Button className="btn-antd" onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PostPickingOut;
