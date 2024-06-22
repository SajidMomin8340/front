import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useParams } from 'react-router-dom';

const HighBalanceItems = () => {
  const { companyId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5050/items?companyId=${companyId}`) // Assuming API supports filtering by companyId
      .then((response) => {
        const highBalanceItems = response.data.data.filter(item => item.balance > 200);
        setItems(highBalanceItems);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [companyId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800">High Balance Items</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full border-collapse block md:table">
            <thead>
              <tr className="border border-gray-200">
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200">Sr. No</th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200">Date</th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200">Invoice Number</th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200">Type</th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200">Credit</th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200">Debit</th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200">Balance</th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200">Vehicle Number</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id} className="bg-white border border-gray-200">
                  <td className="p-2 text-gray-800">{index + 1}</td>
                  <td className="p-2 text-gray-800">{formatDate(item.date)}</td>
                  <td className="p-2 text-gray-800">{item.invoice_no}</td>
                  <td className="p-2 text-gray-800">{item.type}</td>
                  <td className="p-2 text-gray-800">{item.credit}</td>
                  <td className="p-2 text-gray-800">{item.debit}</td>
                  <td className="p-2 text-gray-800">{item.balance}</td>
                  <td className="p-2 text-gray-800">{item.vehicle_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HighBalanceItems;
