import React from 'react';
import {bytesToSize} from "../utils";

const FilesList: React.FC<{files: File[]}> = ({ files }) => {
    if (!files.length) return null;

    return (
        <ul>
            {files.map((file) => (
                <li key={file.name}>{`${file.name}, size: ${bytesToSize(file.size)}`}</li>
            ))}
        </ul>
    );
};

export default FilesList;
