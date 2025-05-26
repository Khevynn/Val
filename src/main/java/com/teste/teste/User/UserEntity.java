package com.teste.teste.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user") //name of the table
public class UserEntity{
     @Id //warn the compilar the next attribute is an ID
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private int id;

     @Column(name="user")
     private String user;

     @Column(name="password")
     private String password;

     public UserEntity(){
     }
     public UserEntity(String user, String password){
          this.user = user;
          this.password = password;
     }
     public int getId(){
          return this.id;
     }
     public String getUser(){
          return this.user;
     }
     public String getPassword(){
          return this.password;
     }
}