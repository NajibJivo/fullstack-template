
// ====== Separation of concerns =======

//Point frontend to backend
const API_URL = "http://localhost:8080/api/users";

async function handle(res) {
    if(!res.ok) throw new Error(`$res.status ${res.statusText}`);
    return res.status === 204 ? null : res.json();
}

export async function getUsers() {
    const res = await fetch(API_URL);
    return handle(res);
}

export async function createUser(user){
    const res = await fetch(API_URL, {
        method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify(user), 
    });
    return handle(res);
}

export async function deleteUser(id){
    const res = await fetch(`${API_URL}/${id}`, {method:"DELETE"});
    return handle(res);
}

export async function updateUser(id, user) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT", headers: {"Content-Type":"application/json"},
        body: JSON.stringify(user),
    });
    return handle(res);
}