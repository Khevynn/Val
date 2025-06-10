package com.olimpo.DTO;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ApiMessage {
    private String message;

    public ApiMessage() {}

    public ApiMessage(String message) {
        this.message = message;
    }
}

