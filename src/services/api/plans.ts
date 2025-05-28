
import api, { API_CONFIG, getApiUrl } from './index';

export interface Plan {
  id: string;
  name: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  features: string[];
  stripe_price_id_monthly: string;
  stripe_price_id_yearly: string;
  is_popular: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Plans API services
export const plansApi = {
  // Get all plans
  getPlans: async (): Promise<Plan[]> => {
    try {
      const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.PLANS);
      console.log("Fetching plans from URL:", url);
      const response = await api.get(url);
      console.log("getPlans response:", response);
      
      if (response.status >= 200 && response.status < 300) {
        // Handle different response structures
        let plansData = response.data;
        
        // If response.data is not an array, try to extract the array
        if (!Array.isArray(plansData)) {
          console.log("Response data is not an array, checking for nested array...");
          if (plansData.plans && Array.isArray(plansData.plans)) {
            plansData = plansData.plans;
          } else if (plansData.data && Array.isArray(plansData.data)) {
            plansData = plansData.data;
          } else {
            console.warn("No array found in response, returning empty array");
            return [];
          }
        }
        
        console.log("Processing plans data:", plansData);
        // Filter only active plans
        const activePlans = plansData.filter((plan: Plan) => plan.is_active);
        console.log("Active plans:", activePlans);
        return activePlans;
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
        throw new Error(`Failed to fetch plans: ${error.response.data?.message || error.response.status}`);
      }
      throw new Error("Failed to fetch plans: " + (error as Error).message);
    }
  },
};
