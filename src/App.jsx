import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Delete from './pages/Delete';
import Show from './pages/Show';
import Edit from './pages/Edit';
import Login from './pages/Log'; // Ensure this is correctly imported
import HighBalanceItems from './pages/HighBalanceItems';
import CompanyDetails from './pages/CompanyDetails';
import CreateCompany from './pages/CreateCompany';
import EditCompany from './pages/EditCompany';
import DeleteCompany from './pages/DeleteCompany';
import HighBalanceCompanies from './pages/HighBalanceCompanies';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/' element={isAuthenticated ? <CompanyDetails /> : <Navigate to="/login" />} />
        <Route path='/create_company' element={isAuthenticated ? <CreateCompany /> : <Navigate to="/login" />} />
        <Route path='/company/:companyId' element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path='/company/:companyId/edit' element={isAuthenticated ? <EditCompany /> : <Navigate to="/login" />} />
        <Route path='/company/:companyId/delete' element={isAuthenticated ? <DeleteCompany /> : <Navigate to="/login" />} />
        <Route path='/company/:companyId/items/create' element={isAuthenticated ? <Create /> : <Navigate to="/login" />} />
        <Route path='/company/:companyId/items/details/:itemId' element={isAuthenticated ? <Show /> : <Navigate to="/login" />} />
        <Route path='/company/:companyId/items/edit/:itemId' element={isAuthenticated ? <Edit /> : <Navigate to="/login" />} />
        <Route path='/company/:companyId/items/delete/:itemId' element={isAuthenticated ? <Delete /> : <Navigate to="/login" />} />
        <Route path='/company/:companyId/items/high-balance' element={isAuthenticated ? <HighBalanceItems /> : <Navigate to="/login" />} />
        <Route path='/high_balance_companies' element={isAuthenticated ? <HighBalanceCompanies /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
