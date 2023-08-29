const API_BASE_URL = 'http://192.168.100.11:8000'
//const API_BASE_URL = 'http://192.168.10.101:8000'
//const API_BASE_URL = 'http://192.168.10.100:8000'
//const API_BASE_URL = 'http://192.168.164.218:8000'
//const API_BASE_URL = 'http://192.168.10.107:8000'
//const API_BASE_URL = 'http://192.168.1.23:8000'
//const API_BASE_URL = 'https://4b3a-2800-bf0-144-d21-af0d-6e1e-e59e-4a60.ngrok.io'


const callApi = async (endpoint, headers, body) => {
    try {
        const response = await fetch(API_BASE_URL + endpoint, {
            method: 'POST',
            headers,
            body,
        })
        const json = await response.json()
        return json
    } catch (error){
        console.log(error)
    }
};

export default callApi