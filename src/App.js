import React, { useEffect, useState } from "react";

const TRANSACTIONS = [
    { id: 1, customerId: 1, customerName: "Alice",   month: "Jan", amount: 120 },
  { id: 2, customerId: 1, customerName: "Alice",   month: "Jan", amount: 75  },
  { id: 3, customerId: 2, customerName: "Bob",     month: "Jan", amount: 45  },
  { id: 4, customerId: 3, customerName: "Charlie", month: "Jan", amount: 200 },
  { id: 5, customerId: 1, customerName: "Alice",   month: "Feb", amount: 101 },
  { id: 6, customerId: 2, customerName: "Bob",     month: "Feb", amount: 99  },
  { id: 7, customerId: 2, customerName: "Bob",     month: "Feb", amount: 130 },
  { id: 8, customerId: 3, customerName: "Charlie", month: "Feb", amount: 51  },
  { id: 9,  customerId: 1, customerName: "Alice",   month: "Mar", amount: 49  },
  { id: 10, customerId: 2, customerName: "Bob",     month: "Mar", amount: 180 },
  { id: 11, customerId: 3, customerName: "Charlie", month: "Mar", amount: 220 },
  { id: 12, customerId: 3, customerName: "Charlie", month: "Mar", amount: 90  }
  ];

  function calculatePoints(amount) {
    var points = 0;
  
    if (amount > 100) {
      points += (amount - 100) * 2; 
      points += 50;                 
    } else if (amount > 50) {
      points += amount - 50;        
    }
  
    return points;
  }
  
  function calculateSummary(transactions) {
    const summary = {};
    const months = ["Jan", "Feb", "Mar"];
  
    transactions.forEach((tx) => {
      const { customerId, customerName, month, amount } = tx;
      const points = calculatePoints(amount);
  
      if (!summary[customerId]) {
        summary[customerId] = {
          customerId,
          customerName,
          perMonth: { Jan: 0, Feb: 0, Mar: 0 },
          total: 0
        };
      }
  
      summary[customerId].perMonth[month] += points;
      summary[customerId].total += points;
    });
  
    return { months, customers: Object.values(summary) };
  }

const App = () => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState([]);

    useEffect(()=>{
        async function load() {
            setTransactions(TRANSACTIONS);
            const result = calculateSummary(TRANSACTIONS);
            setSummary(result);
            setLoading(false);
          }
          load();
          
    },[]);
    
    if (loading) {
        return <div style={{ padding: "1rem" }}>Loading reward data...</div>;
      }

    return (
    <>
        <h2 style={{ marginTop: "40px" }}>Customer Transactions</h2>

            <table border="1" cellPadding="8">
            <thead>
                <tr>
                <th>Month</th>
                <th>Customer</th>
                <th>Amount ($)</th>
                <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((tx) => (
                <tr key={tx.id}>
                    <td>{tx.month}</td>
                    <td>{tx.customerName}</td>
                    <td>{tx.amount}</td>
                    <td>{calculatePoints(tx.amount)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        <h2>Customer Reward Points</h2>
        <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Jan</th>
            <th>Feb</th>
            <th>Mar</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {summary.customers.map((c) => (
            <tr key={c.customerId}>
              <td>{c.customerName}</td>
              <td>{c.perMonth.Jan}</td>
              <td>{c.perMonth.Feb}</td>
              <td>{c.perMonth.Mar}</td>
              <td><b>{c.total}</b></td>
            </tr>
          ))}
        </tbody>
        </table>

    </>
    );
}

export default App;