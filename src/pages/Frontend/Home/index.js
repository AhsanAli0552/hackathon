import React, { useContext } from 'react';
import NotesList from '../NotesList';
import { AuthContext } from '../../../context/AuthContext';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
const Home = () => {
  const { user } = useContext(AuthContext)
  return (
    <main className="frontend">
    <div className="container-fluid p-5 app-background text-light">
      {/* Header Section */}
      <div className="header-section d-flex flex-column align-items-center mb-4">
        <h1 className="display-5 fw-bold text-accent">Hi, {user.fullName}</h1>
        <h4 className="text-secondary text-center">Welcome to Your Notes App</h4>
      </div>
  
      {/* Search Section */}
      <div className="search-section mx-auto" style={{ maxWidth: '600px' }}>
        <div className="input-group shadow rounded-pill">
          <span className="input-group-text search-icon bg-primary text-light rounded-pill-start">
            <SearchOutlined />
          </span>
          <input 
            type="text" 
            className="form-control rounded-pill-end" 
            placeholder="Search your notes..." 
          />
        </div>
      </div>
  
      {/* Notes Section */}
      <div className="notes-section mt-5">
        <h5 className="fw-bold text-primary text-uppercase mb-3">All Notes</h5>
        <NotesList />
      </div>
  
      {/* Add Note Button */}
      <div className="text-center mt-5">
        <Link to="/Add" className="btn btn-lg btn-custom shadow-lg rounded-pill">
          <PlusOutlined className="me-2" />
          <span>Add New Note</span>
        </Link>
      </div>
    </div>
  </main>
  
  );
};

export default Home;
