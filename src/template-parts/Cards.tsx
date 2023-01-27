import React from 'react'
import { data } from '../../data'
import Card from '../components/Card/Card'


const Cards = () => {
    return (
        <div className="cards">
            {
                data.map((d, idx) => (
                    <Card key={`d-${idx}`} data={d} />
                ))
            }
        </div>
    )
}

export default Cards;
