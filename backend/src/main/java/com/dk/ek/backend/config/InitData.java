package com.dk.ek.backend.config;

import com.dk.ek.backend.model.User;
import com.dk.ek.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InitData {
    @Bean
    CommandLineRunner seedUsers(UserRepository userRepo) {
        return args -> {
            if(userRepo.count()==0){
                userRepo.save(new User(null, "Alice","alice@example.com","aliceo1" ));
                userRepo.save(new User(null, "Bob","bob@example.com","bobby" ));
                userRepo.save(new User(null, "Eve","eve@example.com","eve22" ));
            }
        };
    }

}
