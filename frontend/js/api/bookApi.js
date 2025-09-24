import { get, post, put, del } from "../utils/fetchUtils.js";

const BASE_URL = "http://localhost:5500/api";
const BOOK_URL = `${BASE_URL}/books`;

export async function getBooks() {
    return get(BOOK_URL);
}

export async function createBook(newBook) {
    return post(`${BOOK_URL}`, newBook);
}

export async function updateBook(id, updatedBook) {
    return put(`${BOOK_URL}/${id}`, updatedBook);
}

export async function deleteBook(id) {
    return del(`${BOOK_URL}/${id}`);
}
