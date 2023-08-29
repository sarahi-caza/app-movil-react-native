const API_BASE_URL = `https://maps.googleapis.com/maps/api/distancematrix/json?`

const apiDistancia = async (startLoc,destinationLoc) => {
    try {
        //const headers = new Headers();
        //headers.append("Content-Type", "application/json");
        //headers.append("key", "");
        const response = await fetch(API_BASE_URL+`origins=${ startLoc }&destinations=${ destinationLoc }&key=AIzaSyDRZpcY9MU5c1atDcgLv4Cyur78hT71YMI`, {
            method: 'GET',
        //    headers,
        })
        const json = await response.json()
        return json
    } catch (error){
        console.log(error)
    }
};

export default apiDistancia