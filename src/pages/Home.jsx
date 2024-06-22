import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete, MdSearch } from 'react-icons/md';
import { useSnackbar } from 'notistack';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const Home = () => {
  const { companyId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  // Example of how you fetch items in useEffect
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5050/items?companyId=${companyId}`)
      .then((response) => {
        const fetchedItems = response.data.data;
        setItems(fetchedItems);
        setFilteredItems(fetchedItems); // Initialize filtered items with all items
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
        setLoading(false);
      });
  }, [companyId]);

  const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filteredData = items.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(lowercasedQuery)
      )
    );
    setFilteredItems(filteredData);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const exportToExcel = () => {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportData = filteredItems.map((item, index) => ({
      'Sr. No': index + 1,
      Date: formatDate(item.date),
      'Invoice Number': item.invoice_no,
      Type: item.type, // Include type field
      Credit: item.credit,
      Debit: item.debit,
      Balance: item.balance,
      'Vehicle Number': item.vehicle_no,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, 'items_list' + fileExtension);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Items List</h1>
        <div className="flex gap-4">
          <Link to={`/company/${companyId}/items/create`}>
            <MdOutlineAddBox className="text-sky-800 text-5xl hover:text-sky-600 transition-colors" />
          </Link>
          <Link to={`/company/${companyId}/items/high-balance`}>
            <button className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors">
              High Balance Items
            </button>
          </Link>
          <button
            onClick={exportToExcel}
            className="py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition-colors"
          >
            Export to Excel
          </button>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by any value"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 w-full md:w-1/3 mr-2"
        />
        <button
          onClick={handleSearch}
          className="py-2 px-4 bg-sky-600 text-white rounded-md hover:bg-sky-500 transition-colors"
        >
          <MdSearch className="text-lg" />
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
              <tr className="border border-gray-200 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">
                  Sr. No
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">
                  Date
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">
                  Invoice Number
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">
                  Type
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">
                  Credit
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">
                  Debit
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">
                  Balance
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">
                  Vehicle Number
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {filteredItems.map((item, index) => (
                <tr
                  key={item._id}
                  className="bg-white border border-gray-200 md:border-none block md:table-row"
                >
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">
                    {index + 1}
                  </td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">
                    {formatDate(item.date)}
                  </td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">
                    {item.invoice_no}
                  </td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">
                    {item.type}
                  </td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">
                    {item.credit}
                  </td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">
                    {item.debit}
                  </td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">
                    {item.balance}
                  </td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">
                    {item.vehicle_no}
                  </td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">
                    <div className="flex justify-center gap-4">
                      <Link
                        to={`/company/${companyId}/items/details/${item._id}`}
                      >
                        <BsInfoCircle className="text-2xl text-green-800 hover:text-green-600 transition-colors" />
                      </Link>
                      <Link
                        to={`/company/${companyId}/items/edit/${item._id}`}
                      >
                        <AiOutlineEdit className="text-2xl text-yellow-800 hover:text-yellow-600 transition-colors" />
                      </Link>
                      <Link
                        to={`/company/${companyId}/items/delete/${item._id}`}
                      >
                        <MdOutlineDelete className="text-2xl text-red-800 hover:text-red-600 transition-colors" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Home;
