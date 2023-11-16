import React from 'react';
import './style.css'
import PostExpense from "../components/Statistic/PostExpense";
import { GetExpense } from "../components/Statistic/GetExpense";

class PageExpense extends React.Component {
    render() {
        return (
            <div className=''>
                <div className="row">
                    <div className="col-md-8">
                        <GetExpense />
                    </div>
                    <div className="col-md-4">
                        <PostExpense />
                    </div>
                </div>
            </div>
        )
    }
}

export default PageExpense;
