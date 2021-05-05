import React from 'react';

type PropTypes = {
    percent: string
}
const UploadProgressBar: React.FC<PropTypes> = ({ percent }) => {
    return (
        <div id="loadingProgress">
            <div id="loadingBar" style={{ width: `${percent}%`}}/>
        </div>
    );
};

export default UploadProgressBar;
