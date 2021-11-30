import { InsertUpdateGoodsoutRecord, GetListofGoodsOutRecordByDate } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';

export const getGoodsOutApi = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetListofGoodsOutRecordByDate}?fromdate=${data.fromdate}&todate=${data.todate}`);
            if(response?.status === 200)
                successCallback(response?.data?.GetListofGoodsOutRecordByDate);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertGoodsOutApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateGoodsoutRecord, formData);
            // if(response?.status === 200){
            returnData(response?.data);
            // }else{}
        } catch (error) {

        }

    }
}
