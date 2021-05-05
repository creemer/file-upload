import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import uploadToFirebase from "./uploadToFirebase";
import {getAcceptedFileTypes, getIsMulti, getRootId} from "./utils";

const id: string = getRootId();
const acceptedFileTypes: string[] = getAcceptedFileTypes();
const isMulti: boolean = getIsMulti()


ReactDOM.render(
    <React.StrictMode>
        <App multi={isMulti} accept={acceptedFileTypes} onUpload={uploadToFirebase}/>
    </React.StrictMode>,
    document.getElementById(id)
);



