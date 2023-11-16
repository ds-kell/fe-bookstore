import React from 'react';
import './style.css'
import PostExpense from "../components/Statistic/PostExpense";

class PageStatistic extends React.Component {
    render() {
        return (
            <div className='body'>
                <PostExpense />
            </div>
        )
    }
}

export default PageStatistic;
