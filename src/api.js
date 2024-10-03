import axios from 'axios';



const API_KEY = 'HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE';
const BASE_URL = 'https://api.recruitly.io/api/company';

export const getCompanyList = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
        lat1: 0,
        lat2: 0,
        lon1: 0,
        lon2: 0,
        mapBound: false,
      },
    });
    return response.data; // Return the list of companies
  } catch (error) {
    console.error('Error fetching company list:', error);
    throw error;
  }
};
