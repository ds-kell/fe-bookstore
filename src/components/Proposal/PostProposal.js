import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";

import { Button } from "antd";

import './proposal.css'
function PostProposal() {
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
                        ...proposalRequest,
                        listBookRq: [
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

    const [proposalRequest, setPickingInRequest] = useState({
        date: new Date().toISOString(),
        listBookRq: [
            {
                idBook: 0,
                quantity: 1,
            },
        ],
    });

    const handleChange = (field, value) => {
        setPickingInRequest({
            ...proposalRequest,
            [field]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            config = {
                method: "POST",
                headers: { Authorization: "Bearer " + accessToken.slice(1, -1) },
            };
            console.log(proposalRequest);
            // const response = await axios.post("http://localhost:8088/api/private/proposal/create-proposal", proposalRequest, config);

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
                        {proposalRequest.listBookRq.map((detail, index) => (
                            <div key={index}>
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    min={1}
                                    value={detail.quantity}
                                    onChange={(e) => handleChange(index, "quantity", parseInt(e.target.value, 10))}
                                />
                            </div>
                        ))}
                        <div className="btn-proposal">
                            <Button className="btn-antd" onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PostProposal;
