package com.olimpo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.olimpo.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    //optional returns the first value finded
    Optional<UserEntity> findByEmailAndPassword(String email, String password); 
    Optional<UserEntity> findByEmail(String email); 
    Optional<UserEntity> findByUserAndTag(String user, String tag);
    List<UserEntity> findAllByUser(String user);
}
