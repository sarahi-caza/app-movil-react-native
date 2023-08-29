const API_BASE_URL = 'https://api.expo.dev/v2/push/send'

const apiNotificacion = async (body) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        })
        const json = await response.json()
        return json
    } catch (error){
        console.log(error)
    }
};

export default apiNotificacion