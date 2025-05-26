package com.teste.teste;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.teste.teste.User.UserEntity;
import com.teste.teste.User.UserRepository;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController //this label warn the compiler that it's a REST CONTROLLER CLASS
public class RestApiController {
    
    //Instatiating the class with the database manipulation methods
    @Autowired //this label avoid calling the class with "new userRepository..."
    private UserRepository userRepository;


    //route to SELECT an user by id
    @RequestMapping(value="/users/{id}", method = RequestMethod.GET)
    public UserEntity getUsers (@PathVariable(value="id") int id){
        Optional<UserEntity> user = userRepository.findById(id); //"Optional" returns the first value finded with the id

        return user.get();
    }

    //route to INSERT an user into the database
    @RequestMapping(value="/users/", method = RequestMethod.POST)
    public UserEntity setUser (@RequestBody UserEntity user){
        return userRepository.save(user); //saving the user into the database
    }

}
