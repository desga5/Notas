import React, { useState, useEffect } from "react";
import {doc, getDoc} from "firebase/firestore";
import { db } from "../firebase";

const LinkForm = (props) => {

    //guardar el estado
    const initialStateValues = {
        name: '',
        description: ''
    };

    const [values, setValues] = useState(initialStateValues);

    //modifica los valores del estado por lo que se ingresa
    const handleInputChange = e => {

        const { name, value } = e.target;
        setValues({ ...values, [name]: value, });

    }


    const handleSubmit = e => {
        e.preventDefault();
        
        props.addOrEditNote(values);

        setValues({...initialStateValues});
    }

    const getNoteByName = async name => {
        const docRef = doc(db, "Notes", name);
        const docSnap = await getDoc(docRef);   
        setValues({...docSnap.data()});
    }

    useEffect(() => {
        if(props.currentNote === ""){
            setValues({ ...initialStateValues});
        } else {
            getNoteByName(props.currentNote);
        }
    }, [props.currentNote]);



    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">

                    <i className="material-icons">event_note</i>

                </div>
                <input type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="name"
                    onChange={handleInputChange} 
                    value={values.name}/>
            </div>

            <br />

            <div className="form-group">

                <textarea name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Escribe aquí tu nota"
                    onChange={handleInputChange}
                    value={values.description}></textarea>

            </div>
            <br />
            <button className="btn btn-primary btn-block">
                {props.currentNote === '' ? "Guardar" : "Editar"}
            </button>

        </form>
    );
};

export default LinkForm;