package com.olimpo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.olimpo.DTO.ApiResponse;

import com.olimpo.DTO.RegisterRequestDTO;
import com.olimpo.DTO.LoginRequestDTO;
import com.olimpo.Repository.UserRepository;
import com.olimpo.Routes.APIRoutes;
import com.olimpo.Services.UserServices;

import jakarta.validation.Valid;

@RestController
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "*")
    @PostMapping(APIRoutes.USER_REGISTER_ROUTE)
    public ResponseEntity<ApiResponse> CallRegistration(@RequestBody @Valid RegisterRequestDTO request) {

        //Check if email is duplicated
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {  
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse("E-mail já existe.")); 
        }
        
        //Check if password is strong
        if (!isPasswordStrong(request.getPassword())) {
            return ResponseEntity
                .badRequest()
                .body(new ApiResponse("A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número."));
        }

        return UserServices.RegisterUser(request, userRepository);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(APIRoutes.USER_LOGIN_ROUTE)
    public ResponseEntity<ApiResponse> CallLogin(@RequestBody @Valid LoginRequestDTO request) {
        return UserServices.LoginUser(request, userRepository);
    }


    private static boolean isPasswordStrong(String password) {
        return password.length() >= 8 &&
               password.matches(".*[A-Z].*") &&
               password.matches(".*[a-z].*") &&
               password.matches(".*\\d.*");
    }
}
