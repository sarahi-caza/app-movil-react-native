//const API_BASE_URL = 'http://192.168.100.11:8000'
//const API_BASE_URL = 'http://192.168.10.101:8000'
//const API_BASE_URL = 'http://192.168.10.100:8000'
//const API_BASE_URL = 'http://192.168.164.218:8000'
//const API_BASE_URL = 'http://192.168.10.107:8000'
const API_BASE_URL = 'http://192.168.1.23:8000'
//const API_BASE_URL = 'https://53d2-190-152-191-226.ngrok.io'

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