package com.olimpo.DTO.Responses;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class APIResponse {
    private String message;

    public APIResponse() {}

    public APIResponse(String message) {
        this.message = message;
    }
}

