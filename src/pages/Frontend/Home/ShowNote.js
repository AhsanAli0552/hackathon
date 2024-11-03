import React, { useContext } from 'react';
import { HomeContext } from '../../../context/HomeContext';
import { AuthContext } from '../../../context/AuthContext';

const ShowNote = () => {
    const { currentNote } = useContext(HomeContext)
    const { createdBy } = currentNote
    const { setIsAppLoading } = useContext(AuthContext);




    return (
        <div className="container my-5">
  <div className="card shadow-lg note-card rounded-4 border-0">
    <div className="card-body p-4">
      <h2 className="card-title text-primary fw-bold mb-3">{currentNote.title}</h2>
      <h5 className="card-subtitle text-secondary mb-4">{currentNote.category}</h5>

      <div className="content-section mb-4">
        <p className="card-text">{currentNote.content}</p>
      </div>

      <div className="d-flex justify-content-between border-top pt-3">
        <div className="text-muted">
          <span className="created-by">Created By: {createdBy}</span>
          {/* Uncomment if needed */}
          {/* <span className="d-block mt-1">Created At: {currentNote.dateCreated}</span> */}
        </div>
      </div>
    </div>
  </div>
</div>

    );
};

export default ShowNote;
