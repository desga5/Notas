import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { db } from "../firebase";
import { setDoc } from "firebase/firestore";
import { doc } from 'firebase/firestore';
import { collection, query, onSnapshot, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';


const Links = () => {

    const [Notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState('');


    //pasa la información a Firebase
    const addOrEditNote = async (noteObject) => {


        //para saber si va a agregar (if) o editar (else)
        if (currentNote === '') {

            let yaExiste = false;

            Notes.forEach(note => {
                if (note.name == noteObject.name) {
                    yaExiste = true;
                }
            })
            if (!yaExiste) {
                await setDoc(doc(db, 'Notes', noteObject.name), noteObject);
                toast('Nota agregada', { type: 'succesful', autoClose: 1000 });
            } else {
                toast('Ya existe una nota con ese nombre',
                    { type: 'warning', autoClose: 1000 });
            }

        } else {
            await setDoc(doc(db, 'Notes', noteObject.name), noteObject);
            toast('Nota editada', { type: 'info', autoClose: 1000 });
            //para que no se pueda editar sin darle al botón
            setCurrentNote('');
        }
    }

    const onDeleteNote = async name => {
        if (window.confirm("¿Está seguro de que quiere eliminar la nota?")) {
            await deleteDoc(doc(db, "Notes", name));
            toast('Nota eliminada', { type: 'error', autoClose: 1500 });
        }
    }

    const getNotes = async () => {

        const q = query(collection(db, "Notes"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const Notesss = [];
            querySnapshot.forEach((doc) => {
                Notesss.push(doc.data());
                // Notesss.push(doc.data.name());
            });
            //  console.log("Notas actuales: ", Notesss.join(", "));
            setNotes(Notesss);
        });


    }
    useEffect(() => {
        getNotes();
    }, []);

    return (
        <div>
            {/**/}

            <div className="col-md-4 p-2">
                <LinkForm {...{ addOrEditNote, currentNote, Notes }} />
            </div>

            <br />
            <h2>Mis notas</h2>


            <div className="col-md-8 p-2">
                {Notes.map(note => (
                    <div className="card mb-1" key={note.name}>
                        <div className="card-body">

                            <div className="d-flex justify-content-between">
                                <h5>{note.name}</h5>

                                <div>

                                    <i className="material-icons"
                                        onClick={() => setCurrentNote(note.name)}>create</i>

                                    <i className="material-icons borrar"
                                        onClick={() => onDeleteNote(note.name)}>delete</i>


                                </div>
                            </div>


                            <p>{note.description}</p>
                        </div>

                    </div>
                ))}
            </div>


        </div>
    );
}

export default Links; 