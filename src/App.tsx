import React, {useState, useEffect} from 'react';
import './App.css';
import {bytesToSize, calculateFilesSize, checkForDICOMUploaded} from "./utils";
import FilesList from "./components/FilesList";
import {ButtonClickType, InputChangeType, TaskOnTypes, UploadError, UploadSnapshot} from "./types";
import UploadProgressBar from "./components/UploadProgressBar";
import Loader from "./components/Loader";

type PropsType = {
    multi: boolean,
    accept: string[],
    onUpload: (files: File[], taskOn: TaskOnTypes) => Promise<any>
}

const App: React.FC<PropsType> = ({multi, accept, onUpload}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [loadPercent, setLoadPercent] = useState<string>('0');
    const [uploadInProgress, setUploadInProgress] = useState<boolean>(false);
    const [hasUploadedDICOM, setHasUploadedDICOM] = useState<boolean | null>(null);

    useEffect(() => {
        // setTimeout - for loader testing
        setTimeout(() => setHasUploadedDICOM(checkForDICOMUploaded('')), 3000)
    }, [])

    const changeHandler = (event: InputChangeType): void => {
        const {files} = event.target;
        if (!files || !files.length) return;

        const filesArray = Array.from(files);

        console.log('Overall files size:', bytesToSize(calculateFilesSize(filesArray)))
        setFiles(filesArray);
    }

    const uploadClickHandler = (event: ButtonClickType) => {
        setUploadInProgress(true);

        onUpload(files, {
            next: progressHandler,
            error: uploadErrorHandler,
            complete: uploadCompleteHandler
        });
    }

    const progressHandler = (snapshot: UploadSnapshot) => {
        const uploadPercent: string = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
        console.log('Snapshot', snapshot, uploadPercent);

        setLoadPercent(uploadPercent)
    }
    const uploadErrorHandler = (error: UploadError) => {
        console.warn('Error on load', error)
        setUploadInProgress(false);
    }
    const uploadCompleteHandler = () => {
        setUploadInProgress(false);
    }

    if (hasUploadedDICOM === null) {
        return <div className="container">
            <Loader/>
        </div>
    }

    return (
        <div className="container">
            {hasUploadedDICOM
                ? <p>DICOM uploaded</p>
                : (<>
                    <div className="file-input">
                        <input type="file"
                               id="file"
                               className="file"
                               multiple={multi}
                               accept={accept.join(',')}
                               onChange={changeHandler}
                        />
                        <label htmlFor="file">
                            Select file
                        </label>
                    </div>
                    <FilesList files={files} />
                    <button id="loadButton" className="button" onClick={uploadClickHandler}>
                        <span>Load files </span>
                    </button>
                    {uploadInProgress && <UploadProgressBar percent={loadPercent}/>}
                </>)
            }
        </div>
    );
}

export default App;
