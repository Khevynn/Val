package com.olimpo.DTO.Responses;

import lombok.Getter;

@Getter
public class LoginResponseDTO {
    private String token;
    private String message;

    public LoginResponseDTO(String token, String message) {
        this.token = token;
        this.message = message;
    }
} 