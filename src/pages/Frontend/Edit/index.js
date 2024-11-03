import React, { useContext, useState } from "react";
import { HomeContext } from "../../../context/HomeContext";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";

export default function Edit() {
  const { currentNote } = useContext(HomeContext);
  const { setIsAppLoading } = useContext(AuthContext);
  const [title, setTitle] = useState(currentNote.title);
  const [content, setContent] = useState(currentNote.content);
  const [category, setCategory] = useState(currentNote.category);


  const navigate = useNavigate("");
  // const {name,description,price,category}=currentitem
  const onedit = async (e) => {
    e.preventDefault();

    setIsAppLoading(true);
    try {
      await updateDoc(doc(firestore, "notes", currentNote.id), {
        ...currentNote,
        title,
        content,
        category,
        dateModified: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error updating document: ", err);
    } finally {
      setIsAppLoading(false);
    }
    // const items = JSON.parse(localStorage.getItem('items')) || []
    // const updateitem = {
    //   ...currentitem,
    //   name,
    //   description,
    //   price,
    //   category,
    // };
    // const updateditems=items.map(item => (item.id === currentitem.id ? updateitem : item) )
    // localStorage.setItem('items',JSON.stringify(updateditems))
    navigate("/");
  };

  const oncancel = () => {
    navigate("/");
  };
  return (
    <main className="frontend py-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5 update-card">
            <h2 className="text-center text-primary fw-bold mb-4">Update Notes</h2>
            <div className="row">
              <div className="col-12 mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg rounded-pill"
                  name="title"
                  value={title}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-12 mb-4">
                <textarea
                  className="form-control form-control-lg rounded"
                  name="content"
                  value={content}
                  placeholder="Content"
                  rows="4"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="col-12 mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg rounded-pill"
                  name="category"
                  value={category}
                  placeholder="Category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
  
              {/* Confirm Button Form */}
              <form onSubmit={onedit} className="col-12 mb-3">
                <button className="btn btn-success w-100 btn-lg rounded-pill shadow-sm">Confirm</button>
              </form>
  
              {/* Cancel Button Form */}
              <form onSubmit={oncancel} className="col-12">
                <button className="btn btn-danger w-100 btn-lg rounded-pill shadow-sm">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  );
}
