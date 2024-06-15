import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteCompany = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companyId } = useParams(); // Use companyId to match the route parameter
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteCompany = () => {
    setLoading(true);
    axios
      .delete(`https://back-seaj.onrender.com/company/${companyId}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Company deleted successfully', { variant: 'success' });
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Delete Company</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col items-center border-2 border-red-400 rounded-lg bg-white shadow-lg w-full p-8 mx-auto">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Are you sure you want to delete this company?</h3>
        <button
          className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-md hover:bg-red-500 transition-colors"
          onClick={handleDeleteCompany}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteCompany;
