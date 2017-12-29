import React from 'react';
import Dropzone from 'react-dropzone';
import FileUpload from 'material-ui-icons/FileUpload';

const styles = {
    dropzone: {
        width: '400px',
        height: '400px',
        alignItems: 'center',
    },
    grid: {
        direction: 'column',
        justify: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        width: '400px',
        height: '400px',
        alignItems: 'center'
    },
  }


class FileDropZone extends React.Component {
    
    processFile(e){
        console.log(e);
        this.props.processFile(e);
    }
    
      render() {
        return (
            <div>
                <Dropzone
                    style={styles.dropzone}
                    accept=".xls, .xlsx, .csv"
                    onDrop={this.processFile.bind(this)}
                >
                    <FileUpload  style={styles.icon}/>
                    <p >Drop your file here or click to select a file to upload.</p>
                    <p>Only *.xls, *.xlsx and *.csv documents will be accepted</p>
                </Dropzone>
            </div>
        );
      }
  }

export default FileDropZone;
