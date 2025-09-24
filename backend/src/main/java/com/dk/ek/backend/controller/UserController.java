package com.dk.ek.backend.controller;

import com.dk.ek.backend.model.User;
import com.dk.ek.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5500","http://127.0.0.1:5500"}) // Live Server
public class UserController {
    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    // 1) GET all  -----------------------------
    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);
    }

    // 2) GET by id  ---------------------------
    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok) // Http status code 200
                .orElseGet(()-> ResponseEntity.notFound().build()); // 404 NOT FOUND
    }


    // 3) POST create  -------------------------
    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        return new ResponseEntity<>(repo.save(user), HttpStatus.CREATED);
    }

    // 4) PUT update
    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
       return repo.findById(id)
               .map(existing -> {
                   existing.setName(user.getName());
                   existing.setEmail(user.getEmail());
                   existing.setUsername(user.getUsername());
                   User saved =  repo.save(existing);
                   return ResponseEntity.ok(saved);
               })
               .orElseGet(()-> ResponseEntity.notFound().build());
    }

    // 5) DELETE  ------------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build(); // 204
        }
        return ResponseEntity.notFound().build(); //404
    }
}
