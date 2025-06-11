package com.olimpo.Exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.olimpo.DTO.ApiMessage;

import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Lida com erros de validação de @Valid/@NotBlank/etc
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiMessage> handleValidationExceptions() {
       return ResponseEntity
                .badRequest()
                .body(new ApiMessage("Campos inválidos ou incompletos."));
    }

}
