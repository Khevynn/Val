package com.olimpo.DTO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
public class LoginRequestDTO {
    
    @NotBlank(message = "O nome de usuário é obrigatório")
    private String user;
    
    @NotBlank(message = "A senha é obrigatório")
    private String password;

    public LoginRequestDTO(String user, String password){
        this.user = user;
        this.password = password;
    }
}
