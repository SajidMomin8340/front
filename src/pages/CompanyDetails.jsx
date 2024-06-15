import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';

const CompanyDetails = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://back-dvw3.onrender.com/company') // Ensure this matches your backend route
      .then((response) => {
        const fetchedCompanies = response.data.data;
        setCompanies(fetchedCompanies);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
        setLoading(false);
      });
  }, []);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-500">Company List</h1>
        <div className="flex gap-4">
          <Link to="/create_company">
            <button className="flex items-center py-1 px-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm">
              <AiOutlinePlusCircle className="mr-1 text-lg" />
              Add Company
            </button>
          </Link>
          <Link to="/high_balance_companies">
            <button className="py-1 px-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
              High Balance Companies
            </button>
          </Link>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Company name..."
          className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-sky-600"
          style={{ width: '70%', fontSize: '1.5rem' }}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-8">
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
              <tr className="border border-gray-200 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">Sr. No</th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">Company Name</th>
                <th className="bg-gray-200 p-2 text-gray-600 text-left font-bold md:border md:border-gray-200 block md:table-cell">Operations</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {filteredCompanies.map((company, index) => (
                <tr key={company._id} className="bg-white border border-gray-200 md:border-none block md:table-row">
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">{index + 1}</td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">{company.name}</td>
                  <td className="p-2 text-gray-800 md:border md:border-gray-200 block md:table-cell">
                    <div className="flex justify-center gap-4">
                      <Link to={`/company/${company._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800 hover:text-green-600 transition-colors" />
                      </Link>
                      <Link to={`/company/${company._id}/edit`}>
                        <AiOutlineEdit className="text-2xl text-yellow-800 hover:text-yellow-600 transition-colors" />
                      </Link>
                      <Link to={`/company/${company._id}/delete`}>
                        <AiOutlineDelete className="text-2xl text-red-800 hover:text-red-600 transition-colors" />
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

export default CompanyDetails;
