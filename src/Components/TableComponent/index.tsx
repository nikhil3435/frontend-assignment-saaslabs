import React from 'react';

import './tableComponent.css';
import { TableDataType, TableRowDataType } from '../../Utils/Types/TableDataTypes';


// const TableHeaderComponent = () => {
//     return (
//         <div className='table-header-component-container'>
//             <div className='table-header-box box-1'>S.No.</div>
//             <div className='table-header-box box-2'>Percentage funded</div>
//             <div className='table-header-box box-3'>Amount pledged</div>
//         </div>
//     )
// }

// const TableDataRowComponent = ({col1,col2,col3}: TableRowDataType) => {
//     return (
//         <div className='table-data-component-container'>
//             <div className='table-data-box box-1'>{col1}</div>
//             <div className='table-data-box box-2'>{col2}</div>
//             <div className='table-data-box box-3'>{col3}</div>
//         </div>
//     )
// }

interface ITableComponent{
    pageNumber: number;
    data: TableDataType[];
}


const TableComponent = ({data,pageNumber}: ITableComponent) => {
    return (
        <div className='table-component-container' >
            {/* <TableHeaderComponent /> */}
            {/* <TableDataRowComponent col1={1} col2={2} col3={3} /> */}
            <table className='table-class'>
                    <tr>
                        <th>S.No.</th>
                        <th>Percentage funded</th>
                        <th>Amount pledged</th>
                    </tr>
                    {data.map((eachRow,index) =>(
                        (((5*pageNumber) <= index) && (index <= ((5*pageNumber) + 4)))?    
                            <tr key={index}>
                                <td>{eachRow['s.no']}</td>
                                <td>{eachRow['percentage.funded']}</td>
                                <td>{eachRow['amt.pledged']}</td>
                            </tr>:
                            <></>
                    ))
                    }
            </table>
        </div>
    )
}

export default TableComponent