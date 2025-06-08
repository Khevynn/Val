package com.olimpo.Services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.ResponseEntity;

import com.olimpo.DTO.ApiResponse;
import com.olimpo.DTO.LoginRequestDTO;
import com.olimpo.DTO.RegisterRequestDTO;
import com.olimpo.Entity.UserEntity;
import com.olimpo.Repository.UserRepository;

import org.springframework.http.HttpStatus;

public class UserServices {

    public static ResponseEntity<ApiResponse> RegisterUser(RegisterRequestDTO request, UserRepository userRepository) {
        try{
            //Get all existing tags for this username
            List<UserEntity> existingUsers = userRepository.findAllByUser(request.getUser());
            Set<String> usedTags = existingUsers.stream()
                .map(UserEntity::getTag)
                .collect(Collectors.toSet());

            //Generate a unique tag
            String tag = null;
            int maxAttempts = 100; // Maximum attempts to generate a unique tag
            int attempts = 0;
            
            do {
                tag = generateRandomTag();
                attempts++;
                if (attempts >= maxAttempts) {
                    return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(new ApiResponse("Não há tags disponíveis para esse usuário, tente com outro usuário."));
                }
            } while (usedTags.contains(tag));

            
            //Creating an UserEntity with a encoded password
            UserEntity user = new UserEntity();
            user.setEmail(request.getEmail());
            user.setUser(request.getUser());
            user.setTag(tag);
            user.setEncodedPassword(request.getPassword());
            userRepository.save(user);

            
            //returning a good response
            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse("Usuário registrado com sucesso."));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new ApiResponse("Erro interno do servidor ao criar usuário."));
        }
    }

    public static ResponseEntity<ApiResponse> LoginUser(LoginRequestDTO request, UserRepository userRepository) {
        try{
            Optional<UserEntity> userSearched = userRepository.findByEmail(request.getEmail()); //finding a user by the email

            if (userSearched.isEmpty() || !new BCryptPasswordEncoder().matches(request.getPassword(), userSearched.get().getPassword() )) { //there is not a user
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse("E-mail ou senha inválidos."));
            }

            return ResponseEntity.ok(new ApiResponse("Login bem-sucedido"));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new ApiResponse("Erro interno do servidor. Tente novamente mais tarde."));
        }
    }

    //Helper function to generate a random tag
    private static String generateRandomTag() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder tag = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            tag.append(chars.charAt((int)(Math.random() * chars.length())));
        }
        return tag.toString();
    }
}
