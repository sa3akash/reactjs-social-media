import React from 'react';
import "./TrendCard.css";
import {TrendData} from "../../data/TrendCardData"

const TrendCard = () => {
  return (
    <div className='TrendCard'>
        <h3>Trends for you</h3>
        {TrendData.map((trend, i)=>(
            <div className='Trends' key={i}>
                <span><b>#{trend.name}</b></span>
                <span style={{fontSize: "14px"}}>{trend.shares}K Shares</span>
            </div>
        ))}
    </div>
  )
}

export default TrendCard;