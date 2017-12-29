import React from 'react';
import XLSX from 'xlsx';

import FileDropZone from './FileDropZone';
import PreviewTable from './PreviewTable';

export default class FileProcessor extends React.Component {
    constructor() {
        super()
        this.state = {
			data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
            cols: [],  /* Array of column objects e.g. { name: "C", K: 2 } */
            fileName: '',
		};
      }

      processFile(acceptedFiles) {
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
        })
    }

    render(){
        return (
            <div>
                <FileDropZone processFile={this.processFile.bind(this)} />
                <PreviewTable data={this.state.data} cols={this.state.cols} fileName={this.state.fileName}/>
            </div>
        )
    }
} 

function make_cols(refstr/*:string*/) {
    var o = [];
    var range = XLSX.utils.decode_range(refstr);
    for(var i = 0; i <= range.e.c; ++i) {
      o.push({name: XLSX.utils.encode_col(i), key:i});
    }
    return o;
  }