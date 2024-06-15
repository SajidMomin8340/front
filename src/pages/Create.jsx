// Create.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete, MdSearch } from 'react-icons/md';
import { useSnackbar } from 'notistack';
import { saveAs } from 'file-saver';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';


const Create = () => {
  const [date, setDate] = useState('');
  const [invoice_no, setInvoiceNo] = useState('');
  const [credit, setCredit] = useState('');
  const [debit, setDebit] = useState('');
  const [vehicle_no, setVehicleNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { companyId } = useParams(); // Get companyId from URL parameters

  const handleSaveItem = () => {
    const calculatedBalance = parseInt(credit) - parseInt(debit);
    const data = {
      date,
      invoice_no,
      credit,
      debit,
      balance: calculatedBalance, // Calculate balance here
      vehicle_no,
      company_id: companyId // Use companyId from URL parameters
    };
    setLoading(true);
    axios
      .post('https://back-528k.onrender.com/items', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Item Created successfully', { variant: 'success' });
        navigate(`/company/${companyId}`);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      enqueueSnackbar('Please select a file to upload', { variant: 'warning' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'yyyy-mm-dd' });

      setLoading(true);
      Promise.all(json.map((item) => {
        const calculatedBalance = parseInt(item.credit) - parseInt(item.debit);
        const data = {
          date: item.date,
          invoice_no: item.invoice_no,
          credit: item.credit,
          debit: item.debit,
          balance: calculatedBalance, // Calculate balance here
          vehicle_no: item.vehicle_no,
          company_id: companyId // Use companyId from URL parameters
        };
        return axios.post('https://back-528k.onrender.com/items', data);
      }))
        .then(() => {
          setLoading(false);
          enqueueSnackbar('Items uploaded successfully', { variant: 'success' });
          setFile(null); // Clear the file input after successful upload
        })
        .catch((error) => {
          setLoading(false);
          enqueueSnackbar('Error uploading items', { variant: 'error' });
          console.log(error);
        });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Create Item</h1>
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
            value={invoice_no}
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
            value={vehicle_no}
            onChange={(e) => setVehicleNo(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>

        <button
          className="py-2 px-4 bg-sky-600 text-white rounded-md hover:bg-sky-500 transition-colors w-full mb-4"
          onClick={handleSaveItem}
        >
          Save
        </button>
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Upload Excel File</label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>
        <button
          className="py-2 px-4 bg-sky-600 text-white rounded-md hover:bg-sky-500 transition-colors w-full"
          onClick={handleFileUpload}
        >
          Upload Excel File
        </button>
      </div>
    </div>
  );
};

export default Create;
