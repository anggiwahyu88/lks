export const api = async (method, url, body) => {
    try {
        const response = await fetch(`http://localhost:8000/api/v1${url}?token=${localStorage.getItem('token') || null}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();
        return {
            isValid: true,
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            isValid: false,
            message: error?.meesage || null
        }
    }
}

