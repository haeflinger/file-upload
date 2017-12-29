import React from 'react';
import ReactDOM from 'react-dom';
import FileProcessor from './FileProcessor';
import './index.css';
import Grid from 'material-ui/Grid';


ReactDOM.render(
      <Grid
        container
        alignItems='center'
        direction='row'
        justify='center'
      >
        <FileProcessor />
      </Grid>,
    document.getElementById('root')
  );
  