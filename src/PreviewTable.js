import React from 'react';
import PropTypes from 'prop-types';
import Table, { TableHead, TableBody, TableCell, TableRow } from 'material-ui/Table';
/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<key:number, value:<any> >;
    cols:Array<{name:string, key:number|string}>;
*/

const PreviewTable = ({fileName, cols, data}) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell >
                    {fileName}
                </TableCell>
            </TableRow>
            <TableRow>
                {cols.map((c) => <TableCell key={c.key}>{c.name}</TableCell>)}
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map((r,i) => <TableRow key={i}>
                {cols.map(c => <TableCell key={c.key}>{ r[c.key] }</TableCell>)}
            </TableRow>)}
        </TableBody> 
    </Table>   
);

PreviewTable.proptypes = {
    fileName: PropTypes.string.isRequired,
    cols: PropTypes.arrayOf(PropTypes.number, PropTypes.any).isRequired,
    data: PropTypes.arrayOf(PropTypes.string, PropTypes.string).isRequired,
};

export default PreviewTable;