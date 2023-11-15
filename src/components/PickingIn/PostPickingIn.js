import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";

import { Button } from "antd";

import './pickingin.css'
function PostPickingIn() {
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
                    setPickingInRequest({
                        ...pickingInRequest,
                        pickingInDetailRequests: [
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

    const [pickingInRequest, setPickingInRequest] = useState({
        total: 0,
        date: new Date().toISOString(),
        note: "",
        pickingInDetailRequests: [
            {
                idBook: 0,
                quantity: 1,
                total: 0,
            },
        ],
    });


    useEffect(() => {
        const calculateTotal = () => {
            const total = pickingInRequest.pickingInDetailRequests.reduce((acc, item) => {
                return item.quantity * item.total;
            }, 0);
            setPickingInRequest({ ...pickingInRequest, total });
        };

        calculateTotal();
    }, [pickingInRequest.pickingInDetailRequests]);

    const handleDetailChange = (index, field, value) => {
        const newPickingInDetails = [...pickingInRequest.pickingInDetailRequests];
        newPickingInDetails[index][field] = value;

        const newTotal = newPickingInDetails.reduce(
            (acc, detail) => acc + detail.quantity * detail.total,
            0
        );

        setPickingInRequest({
            ...pickingInRequest,
            pickingInDetailRequests: newPickingInDetails,
            total: newTotal,
        });
    };


    const handleChange = (field, value) => {
        setPickingInRequest({
            ...pickingInRequest,
            [field]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            config = {
                method: "POST",
                headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
            };
            console.log(pickingInRequest);
            const response = await axios.post("http://localhost:8088/api/private/picking-in/create-picking-in", pickingInRequest, config);

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="">
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
                        {pickingInRequest.pickingInDetailRequests.map((detail, index) => (
                            <div key={index}>
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    min={1}
                                    value={detail.quantity}
                                    onChange={(e) => handleDetailChange(index, "quantity", parseInt(e.target.value, 10))}
                                />
                            </div>
                        ))}
                        <textarea
                            placeholder="Note"
                            value={pickingInRequest.note}
                            onChange={(e) => handleChange("note", e.target.value)}
                        ></textarea>
                         <div className="btn-picking-in">
                            <Button className="btn-antd" onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PostPickingIn;
