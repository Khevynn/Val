package com.teste.teste.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    //optional returns the first value finded
    Optional<UserEntity> findByUserAndPassword(String user, String password); 
    Optional<UserEntity> findByEmail(String email); 
    Optional<UserEntity> findByUser(String user); 
}
