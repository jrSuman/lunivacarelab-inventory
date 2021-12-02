import { GetLocationDetails, InsertUpdateLocation } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getLocationApi = (successCallback, id = 0) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetLocationDetails}?id=${id}`);
            if(response?.status === 200)
                successCallback(response?.data?.LocationDetails);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertLocationApi = (data, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(data)
            const response = await store(InsertUpdateLocation, formData);
            // if(response?.status === 200)
                returnData(response?.data)
            // else
            //     returnData([])
        } catch (error) {

        }

    }
}