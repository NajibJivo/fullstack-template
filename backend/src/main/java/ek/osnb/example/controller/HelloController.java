package ek.osnb.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hello")
public class HelloController {

    public record HelloResponse(String message) {}

    @GetMapping
    public ResponseEntity<HelloResponse> hello() {
        String message = "Hello, World - updated!";
        HelloResponse response = new HelloResponse(message);
        return ResponseEntity.ok(response);
    }
}
