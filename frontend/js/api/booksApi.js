import { get, post, put, del } from "../utils/fetchUtils.js";


const BASE_URL = "http://localhost:8080/api";
const BOOKS_URL = `${BASE_URL}/books`;

export async function getBooks() {
    return get(BOOKS_URL);
}

export async function createBook(newBook) {
    return post(BOOKS_URL, newBook);
}

export async function updateBook(id, updatedBook) {
    return put(`${BOOKS_URL}/${id}`, updatedBook);
}

export async function deleteBook(id) {
    console.log("id " + id);

    return del(`${BOOKS_URL}/${id}`);
}