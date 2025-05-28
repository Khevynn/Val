package com.olimpo.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.olimpo.DTO.ApiResponse;
import com.olimpo.DTO.LoginRequest;
import com.olimpo.DTO.RegisterRequest;
import com.olimpo.Entity.UserEntity;
import com.olimpo.Repository.UserRepository;

@RestController 
public class RestApiController {
    
    //Instatiating the class with the database manipulation methods
    @Autowired 
    private UserRepository userRepository;

    //route to REGISTER an user into the database
    @PostMapping("/user/register")
    public ResponseEntity<ApiResponse> register(@RequestBody @Valid RegisterRequest request) {
    
        //cheacking if email is duplicated
        if (userRepository.findByEmail(request.getEmail()).isPresent()) { 
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse("Email já cadastrado."));
        }

        //checking if user is duplicated
        if (userRepository.findByUser(request.getUser()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse("Nome de usuário já cadastrado."));
        }

        //Creating an UserEntity with a encoded password
        UserEntity user = new UserEntity();
        user.setUser(request.getUser());
        user.setEmail(request.getEmail());
        user.setEncodedPassword(request.getPassword());
        userRepository.save(user);

        //returning a good response
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new ApiResponse("Usuário registrado com sucesso."));
}   
    @PostMapping("/user/login")
    public ResponseEntity<ApiResponse> login (@RequestBody @Valid LoginRequest request){

        Optional<UserEntity> userSearched = userRepository.findByUser(request.getUser()); //finding a user by the username

        if (userSearched.isEmpty()) { //there is not a user
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Usuário não encontrado."));
        }

        UserEntity user = userSearched.get();
        boolean passwordMatches = new BCryptPasswordEncoder().matches(request.getPassword(), user.getPassword());

        if (!passwordMatches) { //the password does not matches
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Senha incorreta"));
        }

        return ResponseEntity.ok(new ApiResponse("Login realizado com sucesso"));
    }
}
