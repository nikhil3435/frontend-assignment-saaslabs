import React from 'react';

import './tableComponent.css';
import { TableDataType } from '../../Utils/Types/TableDataTypes';


interface ITableComponent{
    pageNumber: number;
    data: TableDataType[];
}


const TableComponent = ({data,pageNumber}: ITableComponent) => {
    return (
        <div className='table-component-container' >
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