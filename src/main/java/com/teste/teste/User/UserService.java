package com.teste.teste.User;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository usuarioRepository;

    public ArrayList<UserEntity> buscarTodos(){
        return (ArrayList<UserEntity>) usuarioRepository.findAll();
    }
    public Optional<UserEntity> autenticarUsuario(String user, String password){
        return usuarioRepository.findByUserAndPassword(user, password);
    }
}
