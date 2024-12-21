import React, { useEffect, useState } from 'react';
// import leftArrow from "../../Assets/Images/leftArrow.svg";
// import leftArrowWithBg from "../../Assets/Images/leftBgArrow.svg";
// import rightArrowWithBg from "../../Assets/Images/rightBgArrow.svg";
// import rightArrow from "../../Assets/Images/rightArrow.svg";


import './dashboard.css';
import { TableDataType } from '../../Utils/Types/TableDataTypes';
import { _getTableData } from '../../Utils/Network/TableData';
import TableComponent from '../TableComponent';


const Dashboard = () => {

    const [data,_setData] = useState<TableDataType[]>([]);
    const [isLoading, _setLoading] = useState(false);
    const [pageNumber,_setPageNumber] = useState(0);
    const [tableColumns,_setTableColumns] = useState<string[]>([])

    console.log(tableColumns);

    const _getTableDataByFetching = async() => {
        try{
            _setLoading(true);
            const response = await _getTableData();
            const responseKeys = Object.keys(response[0]);
            _setTableColumns(responseKeys);
            _setData(response);
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
        finally{
            _setLoading(false)
        }
    }

    useEffect(()=>{

        _getTableDataByFetching()
        return () => {
            //clean up function
        }
    },[])

    return (
        <div className='dashboard-container'>
            <div className='dashboard-header'>Saas Labs Assignment</div>
            <div className='table-container'>
                {isLoading?
                    <>
                        Loading...
                    </>
                :
                <TableComponent data={data} pageNumber={pageNumber} />
                }
            </div>
            <div className='dashboard-page-number-container' >
                <div className='dashboard-page-number-text'>
                    {`Page ${pageNumber + 1} of ${((data.length/5) + 1).toFixed(0)}`}
                </div>
            </div>
            <div className='buttons-container'>
                <button  className='button' disabled={pageNumber === 0} onClick={()=> _setPageNumber(pageNumber - 1)}  >prev </button>
                <button  className='button' disabled={pageNumber === Number(Number((data.length/5)).toFixed(0))} onClick={()=> _setPageNumber(pageNumber + 1)} >next</button>
                {/* <div>
                    <img src={leftArrow} />
                    <img src={rightArrowWithBg} />
                </div> */}
            </div>

        </div>
    )
}

export default Dashboard