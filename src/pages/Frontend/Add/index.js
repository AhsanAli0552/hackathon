import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
// import { HomeContext } from "../../../context/HomeContext";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";

export default function Add() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { user, setIsAppLoading } = useContext(AuthContext);
  // const { addItems } = useContext(HomeContext);
  const navigate = useNavigate("");
  // const {id} = useContext(HomeContext);
  // const {setId} = useContext(HomeContext);
  const id =
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  // const getRandomId = () => Math.random().toString(36).slice(2)

  // setId(getRandomId());

  const handlesubmit = async (e) => {
    e.preventDefault();
    // addItems({ name, title, content, category, id });
    let data = {
      title,
      content,
      category,
      id,
      dateCreated: serverTimestamp(),
      createdBy: user.uid,
    };
    addItem(data)
  };

  const addItem = async (data) => {
    setIsAppLoading(true);
    try {
      await setDoc(doc(firestore, "notes", data.id), data);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setIsAppLoading(false);
    }
    navigate("/");
    // console.log(process.env.REACT_APP_NAME);
  };

  return (
    <main className="frontend py-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow-lg border-0 rounded-4 mx-auto p-4 p-md-5 form-card">
            <h2 className="text-center text-accent fw-bold mb-4">Add a New Note</h2>
            <form onSubmit={handlesubmit}>
              <div className="row">
                <div className="col-12 mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-pill"
                    name="title"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="col-12 mb-4">
                  <textarea
                    className="form-control form-control-lg rounded"
                    name="content"
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
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100 btn-lg rounded-pill shadow-sm">Add Note</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  );
}
