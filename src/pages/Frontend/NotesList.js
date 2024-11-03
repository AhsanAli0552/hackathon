import { collection, deleteDoc, doc, Firestore, getDocs, query } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { firestore } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AuthContext } from '../../context/AuthContext';
import { HomeContext } from '../../context/HomeContext';



const NotesList = () => {
    const [notes, setNotes] = useState([])
    const { currentNote, setCurrentNote } = useContext(HomeContext)
    const { setIsAppLoading } = useContext(AuthContext)
    const navigate = useNavigate("")

    const handleNavigate = (e) => {
        e.preventDefault()
        navigate("/Note")
    }
    const handleedit = (e) => {
        e.preventDefault()
        navigate("/Edit")
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        setIsAppLoading(true)
        try {
            await deleteDoc(doc(firestore, "notes", currentNote.id));
            // const updateditems = items.filter((item) => item.id !== currentitem.id);
            // setItems(updateditems);
        } catch (error) {
            console.error("Error removing document: ", error);
        } finally {
            setIsAppLoading(false);
        }
    }



    const getitems = useCallback(async () => {
        const querySnapshot = await getDocs(
            query(
                collection(firestore, "notes")
                // where("createdBy.uid", "==", user.uid)
            )
        );
        const array = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // console.log(doc.id, " => ", data);
            array.push(data);
        });
        setNotes(array);
    }, []);
    useEffect(() => {
        getitems();
    }, [getitems]);
    return (
        <div className="mt-2">
            {notes.map((note) => (
                <div key={note.id} className="note-item p-3 mb-3 rounded d-flex justify-content-between align-items-center">
                    <div>
                        <strong className='text-white'>{note.title}</strong>
                        <br></br>
                        <small className='text-white'>{note.category} </small>
                    </div>
                    <div className='d-inline'>
                        <form onSubmit={handleNavigate} className='d-inline'>

                            <button className='btn btn-dark' onClick={() => {
                                setCurrentNote(note)
                            }}>View Note</button>
                        </form>

                        <form className='d-inline' onSubmit={handleedit}>

                            <button className='btn btn-warning ms-2' onClick={() => { setCurrentNote(note) }}>
                                Edit
                            </button>
                        </form>
                        <form onSubmit={handleDelete} className='d-inline'>

                            <button onClick={() => { setCurrentNote(note) }} className='btn btn-danger ms-2'>
                               Delete

                            </button>
                        </form>


                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotesList;
