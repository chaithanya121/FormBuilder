
import api, { API_CONFIG, formatUrl, getApiUrl } from './index';
import { v4 as uuidv4 } from 'uuid';
import { FormConfig } from '@/components/FormBuilder/types';
import process from 'process'
import { PlatForm } from '@/store/slices/platformSlice';




// Forms API services
export const platformApi = {
  getPlatForm: async (): Promise<PlatForm | {}> => {
    try {
      // First try to get from cache

        const url = getApiUrl(API_CONFIG.ENDPOINTS.PLATFROM.GET_PLATFORM);
   
      const {data} = await api.get(url);
    

    //   if (response.status >= 200 && response.status < 300) {
    //     // Handle different response structures
    //     let formsData = response.data;
      
    //     return formsData;
       

      
    //   } else {
    //     throw new Error(`Server responded with status ${response.status}`);
    //   }
      return data
    } catch (error) {
      console.error(`Error fetching form :`, error);
      throw new Error("Failed to fetch form: " + (error as Error).message);
    }
  },

 
};
