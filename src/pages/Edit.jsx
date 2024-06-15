import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Edit = () => {
  const [date, setDate] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [credit, setCredit] = useState('');
  const [debit, setDebit] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companyId, itemId } = useParams(); // Use itemId to match the route parameter
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://back-seaj.onrender.com/items/${itemId}`)
      .then((response) => {
        const { date, invoice_no, credit, debit, vehicle_no } = response.data;
        // Format the date to yyyy-MM-dd
        const formattedDate = new Date(date).toISOString().split('T')[0];
        setDate(formattedDate);
        setInvoiceNo(invoice_no);
        setCredit(credit);
        setDebit(debit);
        setVehicleNo(vehicle_no);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check console.', { variant: 'error' });
        console.error(error);
      });
  }, [itemId]);

  const handleEditItem = () => {
    const calculatedBalance = parseInt(credit) - parseInt(debit);
    const data = {
      date,
      invoice_no: invoiceNo,
      credit,
      debit,
      balance: calculatedBalance,
      vehicle_no: vehicleNo,
      company_id: companyId
    };
    setLoading(true);
    axios
      .put(`http://localhost:5050/items/${itemId}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Item edited successfully', { variant: 'success' });
        navigate(`/company/${companyId}`);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.error(error);
      });
  };

  const handleBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Edit Item</h1>
        <button
          onClick={handleBack}
          className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
        >
          Back
        </button>
      </div>
      {loading && <Spinner />}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Invoice No</label>
          <input
            type="number"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Credit</label>
          <input
            type="number"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Debit</label>
          <input
            type="number"
            value={debit}
            onChange={(e) => setDebit(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Vehicle Number</label>
          <input
            type="text"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>
        <button
          className="py-2 px-4 bg-sky-600 text-white rounded-md hover:bg-sky-500 transition-colors w-full"
          onClick={handleEditItem}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Edit;
