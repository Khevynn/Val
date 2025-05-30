package com.olimpo.Entity;

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
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="users")
public class UserEntity {
     @Id 
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Getter
     private int id;

     @NotBlank(message = "O nome de usuário é obrigatório")
     @Column(name="username")
     @Getter @Setter
     private String user;

     @NotBlank(message = "A senha é obrigatório")
     @Column(name="password")
     @Getter
     private String password;

     @NotBlank(message = "O email é obrigatório")
     @Column(name="email")
     @Getter @Setter
     private String email;

     @CreationTimestamp(source=SourceType.DB)
     @Getter
     private Timestamp date;
     
     public UserEntity() {
     }

     public void setEncodedPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(password);
     }
}