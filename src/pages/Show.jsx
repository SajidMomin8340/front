import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const Show = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const { itemId } = useParams(); // Use itemId to match the route parameter in App.js

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://back-seaj.onrender.com/items/${itemId}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <Spinner />;
  }

  if (!item) {
    return <div className="p-8 max-w-3xl mx-auto">No item found.</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Show Item</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Date</label>
          <p className="border border-gray-300 rounded-md py-2 px-4">{item.date}</p>
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Invoice Number</label>
          <p className="border border-gray-300 rounded-md py-2 px-4">{item.invoice_no}</p>
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Credit</label>
          <p className="border border-gray-300 rounded-md py-2 px-4">{item.credit}</p>
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Debit</label>
          <p className="border border-gray-300 rounded-md py-2 px-4">{item.debit}</p>
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Balance</label>
          <p className="border border-gray-300 rounded-md py-2 px-4">{item.balance}</p>
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Vehicle Number</label>
          <p className="border border-gray-300 rounded-md py-2 px-4">{item.vehicle_no}</p>
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Create Time</label>
          <p className="border border-gray-300 rounded-md py-2 px-4">{new Date(item.createdAt).toLocaleString()}</p>
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Last Update Time</label>
          <p className="border border-gray-300 rounded-md py-2 px-4">{new Date(item.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Show;
