import React, { useState, useEffect } from 'react';
import "./TotalCost.css";

const TotalCost = ({ totalCosts, items }) => {

  return (
    <div className="pricing-app">
      <div className="display_box">
        <div className="header">
          <p className="preheading"><h3>Total cost for the event</h3></p>
        </div>
        <div>
          <h2 id="pre_fee_cost_display" className="price">${totalCosts}</h2>

          <div className="render_items">
            <div className="display_box1">
              {items.length === 0 && <p>No items selected</p>}
              <table className="table_item_data">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Unit Cost</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>${item.cost}</td>
                      <td>
                        {item.type === "meals" || item.numberOfPeople
                          ? ` For ${numberOfPeople} people`
                          : item.quantity}
                      </td>
                      <td>{item.type === "meals" || item.numberOfPeople
                        ? `${item.cost * numberOfPeople}`
                        : `${item.cost * item.quantity}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCost;
