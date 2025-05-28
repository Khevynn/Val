package com.olimpo.DTO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "A senha é obrigatório")
    private String password;

    @NotBlank(message = "O nome de usuário é obrigatório")
    private String user;

    public LoginRequest(String user, String password){
        this.user = user;
        this.password = password;
    }

    public String getUser() {
        return this.user;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUser(String user) {
        this.user = user;
    }
    public void setEncodedPassword(String password){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(password);
     }
}
