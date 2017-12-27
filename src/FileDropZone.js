import React from 'react';
import Dropzone from 'react-dropzone';
import XLSX from 'xlsx';
import PreviewTable from './PreviewTable';

class FileDropZone extends React.Component {
    constructor() {
        super()
        this.state = {
			data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
            cols: [],  /* Array of column objects e.g. { name: "C", K: 2 } */
            fileName: '',
		};
      }
      
      onDrop(acceptedFiles) {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, {type:'binary'});
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, {header:1});
                /* Update state */
                this.setState({ data: data, cols: make_cols(ws['!ref']), fileName: file.name });
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
    
            reader.readAsBinaryString(file);
        });
    }
      onDropRejected(accepted, rejected) {
          alert("Bad file");
      }

      render() {
        return (
          <section>
            <div className="dropzone">
              <Dropzone
                accept=".xls, .xlsx, .csv"
                onDrop={this.onDrop.bind(this)}
              >
                <p>Drop your file here or click to select a file to upload.</p>
                <p>Only *.xls, *.xlsx and *.csv documents will be accepted</p>
              </Dropzone>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <PreviewTable data={this.state.data} cols={this.state.cols} fileName={this.state.fileName}/>
                </div>
            </div>
          </section>
        );
      }
  }
export default FileDropZone;



function make_cols(refstr/*:string*/) {
    var o = [];
    var range = XLSX.utils.decode_range(refstr);
    for(var i = 0; i <= range.e.c; ++i) {
      o.push({name: XLSX.utils.encode_col(i), key:i});
    }
    return o;
  }

