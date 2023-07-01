const API_BASE_URL = 'http://192.168.100.11:8000'
//cel sarahi const API_BASE_URL = 'http://172.20.10.2:8000'
//const API_BASE_URL = 'http://192.168.10.101:8000'
//const API_BASE_URL = 'http://192.168.100.91:8000'


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