package com.teste.teste;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.teste.teste.User.UserEntity;
import com.teste.teste.User.UserRepository;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController 
public class RestApiController {
    
    //Instatiating the class with the database manipulation methods
    @Autowired 
    private UserRepository userRepository;


    //route to REGISTER an user into the database
    @RequestMapping(value="/user/register", method = RequestMethod.POST)
    public ResponseEntity<?> setUser (@RequestBody @Valid UserEntity user){

        Optional<UserEntity> findByEmail = userRepository.findByEmail(user.getEmail()); //cheacking if email is duplicated

        Optional<UserEntity> findByUser = userRepository.findByUser(user.getUser()); //checking if user is duplicated

        if(!findByEmail.isEmpty()){ //email duplicated
            return ResponseEntity.badRequest().body("Email já cadastrado");
        } 
        
        if(!findByUser.isEmpty()) { //user duplicated
            return ResponseEntity.badRequest().body("Nome de usuário já cadastrado");
        } 

        user.setEncodedPassword(user.getPassword()); //encoding password
        userRepository.save(user); //saving user
        return ResponseEntity.ok("Usuário registrado");
        
    }

}
