package com.olimpo.DTO;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
public class RegisterRequestDTO {

    @NotBlank(message = "O nome de usuário é obrigatório")
    private String user;

    @NotBlank(message = "A senha é obrigatório")
    private String password;

    @NotBlank(message = "O email é obrigatório")
    private String email;

    public RegisterRequestDTO(String user, String password, String email){
        this.user = user;
        this.email = email;
        this.password = password;
    }
}
