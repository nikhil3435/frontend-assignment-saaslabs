import React, { useEffect, useState } from 'react';
import leftArrow from "../../Assets/Images/leftArrow.svg";
import leftArrowWithBg from "../../Assets/Images/leftBgArrow.svg";
import rightArrowWithBg from "../../Assets/Images/rightBgArrow.svg";
import rightArrow from "../../Assets/Images/rightArrow.svg";


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

    const goToNextPage = () => {
        if(pageNumber != 0){
            _setPageNumber(pageNumber - 1)
        }
    }

    const goToPreviousPage = () => {
        if(pageNumber != Number(Number((data.length/5)).toFixed(0))){
            _setPageNumber(pageNumber + 1)
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
                <div>
                    <img src={pageNumber === 0 ?  leftArrow: leftArrowWithBg} onClick={goToNextPage} className={`button-image margin-right ${pageNumber != 0? 'button-hover': '' }`}  />
                    <img src={pageNumber === Number(Number((data.length/5)).toFixed(0)) ? rightArrow:  rightArrowWithBg} onClick={goToPreviousPage} className={`button-image ${pageNumber != Number(Number((data.length/5)).toFixed(0))? 'button-hover': '' }`} />
                </div>
            </div>

        </div>
    )
}

export default Dashboard