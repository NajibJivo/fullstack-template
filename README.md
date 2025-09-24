# Fullstack using Spring Boot & JavaScript

## Struktur
- `/backend` — Spring Boot (Java 21, Spring Web, JPA, H2)
- `/frontend` — HTML/CSS/JS (Live Server)

## Backend (IntelliJ)
- Dependencies: Spring Web, Spring Data JPA, H2, MySQL Driver
- Run: `mvn spring-boot:run`
- Dev DB: H2 (in-memory)
- H2 console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:testdb`  ·  user: `sa`  ·  password: *(tom)*
- API base: `http://localhost:8080/api/users`
  - `GET /api/users` — list
  - `GET /api/users/{id}` — get by id
  - `POST /api/users` — create
  - `PUT /api/users/{id}` — update
  - `DELETE /api/users/{id}` — delete

## Frontend (VS Code)
- Åbn `frontend/index.html` med Live Server (`http://localhost:5500`)
- `app.js` bruger `API_URL = "http://localhost:8080/api/users"`
- Sorting: klik på kolonneheaders (▲▼)
- Search: form over tabellen (name/email/username)

## Kørsel (lokalt)
1. `cd backend && mvn spring-boot:run`
2. Åbn `frontend/index.html` med Live Server
3. Test CRUD fra UI

## CORS
Controller har:
```java
@CrossOrigin(origins = {"http://localhost:5500","http://127.0.0.1:5500"})