import { tableDataUrl } from "../../Constants/config";

export const _getTableData = async() => {
    const response = 
        fetch(tableDataUrl).then
            (
                response => response.json()
            ).catch(
                error => console.log("Error fetching data: ",error)
            )
    return response;
}