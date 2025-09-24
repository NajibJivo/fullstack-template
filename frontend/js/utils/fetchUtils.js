function createFetchOptions(httpMethod, body, headers = {}) {
    const options = {
        headers: {
            "Accept": "application/json",
            ...headers
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json";
    }

    return options;
}

async function handleResponse(res) {
    if (res === 204) {
        return null;
    }

    if (!res.ok) {
        const error = new Error("HTTP error! status: " + res.status);
        error.statusText = res.statusText;

        throw error;
    }

    // Should we check if it is JSON????
    return res.json();
}


export async function get(url, headers) {
    const options = createFetchOptions("GET", null, headers);
    const res = await fetch(url, options);
    return handleResponse(res);
}

export async function post(url, body, headers) {
    const options = createFetchOptions("POST", body, headers);
    const res = await fetch(url, options);
    return handleResponse(res);
}

export async function put(url, body, headers) {
    const options = createFetchOptions("PUT", body, headers);
    const res = await fetch(url, options);
    return handleResponse(res);
}

export async function del(url, headers) {
    const options = createFetchOptions("DELETE", headers);
    const res = await fetch(url, options);
    return handleResponse(res);
}

