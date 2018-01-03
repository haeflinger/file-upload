import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import FileUpload from 'material-ui-icons/FileUpload';

/*
File upload component
    usage: <FileDropZone processFile={function}  acceptedFileTypes={String} styles={styles} />
    processFile: Function implementation of onDrop(acceptedFiles, rejectedFiles)
    acceptedFileTypes: space delimeted ex.'.xls, .xlsx, .csv'
    styles: Styles for the dropzone
    https://react-dropzone.js.org/
*/

const thisStyles = {
    icon: {
      width: '75%',
      height: '75%',
    },
    text: {
      textAlign: 'center',
    },
    dropzone: {
        textAlign: 'center',
        borderStyle: 'dashed',
        width: '100%',
        height: '100%',
    }
  };
  
  const FileDropZone = ({ processFile, acceptedFileTypes, styles }) => (
    <div>
      <Dropzone
        style={{...thisStyles.dropzone, ...styles}}
        accept={acceptedFileTypes}
        onDrop={processFile}
      >
        <FileUpload style={thisStyles.icon} />
        <p style={thisStyles.text}>Drag and drop files to upload or click to browse for a file</p>
        <p style={thisStyles.text}>
          Only the following extensions are allowed: {acceptedFileTypes}
        </p>
      </Dropzone>
    </div>
  );
  
  FileDropZone.propTypes = {
    processFile: PropTypes.func.isRequired,
    acceptedFileTypes: PropTypes.string.isRequired,
    styles: PropTypes.shape({ width: PropTypes.string, height: PropTypes.string }),
  };
export default FileDropZone;
