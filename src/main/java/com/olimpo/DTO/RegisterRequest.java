package com.olimpo.DTO;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {

    @NotBlank(message = "A senha é obrigatório")
    private String password;

    @NotBlank(message = "O nome de usuário é obrigatório")
    private String user;

    @NotBlank(message = "O email é obrigatório")
    private String email;

    public RegisterRequest(String user, String password, String email){
        this.user = user;
        this.email = email;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
