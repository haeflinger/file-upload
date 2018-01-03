import React from 'react';
import XLSX from 'xlsx';
import Grid from 'material-ui/Grid';

import FileDropZone from './FileDropZone';
import PreviewTable from './PreviewTable';

const dropZoneStyles = {
        width: '400px',
        height: '300px',
      
        
  }

export default class FileProcessor extends React.Component {
    constructor() {
        super()
        this.state = {
			data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
            cols: [],  /* Array of column objects e.g. { name: "C", K: 2 } */
            fileName: '',
		};
      }

      processFile(acceptedFiles, rejectedFiles) {
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
        console.log(rejectedFiles);
       rejectedFiles.forEach(file => {
            alert(`The file ${file.name} is not a valid xls, xlsx, or csv file.`)
       });
    }

    render(){
        const styles = dropZoneStyles;
        return (
            <Grid container spacing={24} justify="center">
                <Grid item xs={12} >
                    <FileDropZone 
                        processFile={this.processFile.bind(this)} 
                        acceptedFileTypes='.xls, .xlsx, .csv'
                        styles={styles} 
                    />
                </Grid>
                <Grid item xs={12}>
                    <PreviewTable 
                        data={this.state.data} 
                        cols={this.state.cols} 
                        fileName={this.state.fileName}
                    />
                </Grid>
            </Grid>
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