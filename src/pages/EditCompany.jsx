import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companyId } = useParams(); // Use companyId to match the route parameter
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5050/company/${companyId}`)
      .then((response) => {
        const { name, address } = response.data;
        setCompanyName(name);
        setCompanyAddress(address || ''); // Set address if available, handle null case
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check console.', { variant: 'error' });
        console.error(error);
      });
  }, [companyId, enqueueSnackbar]);

  const handleEditCompany = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5050/company/${companyId}`, { name: companyName, address: companyAddress })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Company edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Edit Company</h1>
      {loading && <Spinner />}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="companyName" className="block text-xl font-medium text-gray-700 mb-2">Company Name</label>
          <input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="companyAddress" className="block text-xl font-medium text-gray-700 mb-2">Address</label>
          <input
            id="companyAddress"
            type="text"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>
        <button
          className="py-2 px-4 bg-sky-600 text-white rounded-md hover:bg-sky-500 transition-colors w-full"
          onClick={handleEditCompany}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditCompany;
