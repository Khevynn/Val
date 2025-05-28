package com.teste.teste.User;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name="users") 
public class UserEntity{
     @Id 
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private int id;

     @NotBlank(message = "A senha é obrigatório")
     @Column(name="password")
     private String password;

     @NotBlank(message = "O nome de usuário é obrigatório")
     @Column(name="user")
     private String user;

     @NotBlank(message = "O email é obrigatório")
     @Column(name="email")
     private String email;

     @CreationTimestamp(source=SourceType.DB)
     private Timestamp date;
     
     public UserEntity(){
     }
     public UserEntity(String user, String password, String email){
          this.user = user;
          this.password = password;
          this.email = email;
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

     public void setId(int id) {
          this.id = id;
     }

     public void setPassword(String password) {
          this.password = password;
     }

     public void setUser(String user) {
          this.user = user;
     }

     public String getEmail() {
          return email;
     }

     public void setEmail(String email) {
          this.email = email;
     }

     public Timestamp getDate() {
          return date;
     }

     public void setDate(Timestamp date) {
          this.date = date;
     }
     
     public void setEncodedPassword(String password){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(password);
     }
}