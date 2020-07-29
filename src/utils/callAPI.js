export const GET = async (endpoint) => {
    let takeReesponse;
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        takeReesponse = response;
        const responseJSON = await response.clone().json();
        return {
            error: false,
            data: responseJSON
        };
    } catch (error) {
        console.log('Fail to get from: ' + endpoint);
        console.log('Error message: ' + error.message);
        try {
            const data = await takeReesponse.text();
            return {
                error: true,
                data: data
            }
        } catch (error) {
            console.log('Fail to get from: ' + endpoint);
            console.log('Error message: ' + error.message);
            return {
                error: true,
                data: error.message
            }
        }
    }
}

export const POST = async (endpoint, payload) => {
    let takeResponse;
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        takeResponse = response;
        const responseJSON = await response.clone().json();
        return {
            error: false,
            data: responseJSON
        };
    } catch (error) {
        console.log('Fail to post from: ' + endpoint);
        console.log('Error message: ' + error.message);
        try {
            const data = await takeResponse.text();
            return {
                error: true,
                data: data
            }
        } catch (error) {
            console.log('Fail to get from: ' + endpoint);
            console.log('Error message: ' + error.message);
            return {
                error: true,
                data: error.message
            }
        }
    }
}

export const PUT = async (endpoint) => {
    try {
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response;
    } catch (error) {
        console.log('Fail to get from: ' + endpoint);
        console.log('Error message: ' + error.message);
    }
}