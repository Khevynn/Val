package com.olimpo.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class LoginRequestDTO {
    
    @NotBlank(message = "Campos obrigatórios ausentes ou formato inválido.")
    private String email;
    
    @NotBlank(message = "Campos obrigatórios ausentes ou formato inválido.")
    private String password;

    public LoginRequestDTO(String email, String password){
        this.email = email;
        this.password = password;
    }
}
