import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';

const HighBalanceCompanies = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://back-528k.onrender.com/items/items') // Updated route to fetch items with balance > 200
      .then((response) => {
        const highBalanceItems = response.data.data;
        setItems(highBalanceItems);
        setFilteredItems(highBalanceItems); // Initialize filtered items with all items
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching high balance items:', error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const filtered = items.filter((item) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return item.company && item.company.name.toLowerCase().includes(lowerCaseQuery);
    });
    setFilteredItems(filtered);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800">High Balance Items</h1>
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search by company name"
            className="px-4 py-2 mr-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </div>
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
                  Company Name
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">
                  Date
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">
                  Invoice Number
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
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {filteredItems.map((item, index) => (
                <tr key={item._id} className="bg-white border border-gray-200 md:border-none block md:table-row">
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">{index + 1}</td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">
                    {item.company ? item.company.name : 'Company Is  Deleted'}
                  </td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">{formatDate(item.date)}</td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">{item.invoice_no}</td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">{item.credit}</td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">{item.debit}</td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">{item.balance}</td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">{item.vehicle_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HighBalanceCompanies;
