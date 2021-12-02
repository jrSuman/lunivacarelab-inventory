import { InsertUpdateUnits, GetUnitsDetails } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { getAllUnitSuccess } from '../store/slices/unitSlice';

export const getItemUnitApi = (successCallback, id = 0) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetUnitsDetails}?id=${id}`);
            if (response?.status === 200) {
                dispatch(getAllUnitSuccess(response?.data))
                successCallback(response?.data?.units);
            }
            else
                successCallback([])
        } catch (error) {

        }

    }
}

export const insertItemUnitApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateUnits, formData);
            returnData(response?.data?.units);
        } catch (error) {

        }

    }
}