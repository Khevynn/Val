package com.olimpo.Services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.olimpo.DTO.Requests.LoginRequestDTO;
import com.olimpo.DTO.Requests.RegisterRequestDTO;
import com.olimpo.DTO.Requests.UpdateProfileRequestDTO; 

import com.olimpo.DTO.Responses.APIResponse;
import com.olimpo.DTO.Responses.GetProfileResponse;
import com.olimpo.Entity.UserEntity;
import com.olimpo.Repository.UserRepository;

public class UserServices {

    public static ResponseEntity<APIResponse> RegisterUser(RegisterRequestDTO request, UserRepository userRepository) {
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
                        .body(new APIResponse("Não há tags disponíveis para esse usuário, tente com outro usuário."));
                }
            } while (usedTags.contains(tag));
            
            System.err.println("Tag: " + tag);

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
                .body(new APIResponse("Usuário registrado com sucesso."));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new APIResponse("Erro interno do servidor ao criar usuário."));
        }
    }

    public static ResponseEntity<APIResponse> LoginUser(LoginRequestDTO request, UserRepository userRepository) {
        try{
            Optional<UserEntity> userSearched = userRepository.findByEmail(request.getEmail()); //finding a user by the email

            if (userSearched.isEmpty() || !new BCryptPasswordEncoder().matches(request.getPassword(), userSearched.get().getPassword() )) { //there is not a user
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(new APIResponse("E-mail ou senha inválidos."));
            }

            return ResponseEntity.ok(new APIResponse("Login bem-sucedido"));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new APIResponse("Erro interno do servidor. Tente novamente mais tarde."));
        }
    }

    public static ResponseEntity<APIResponse> GetProfile(String user, String tag, UserRepository userRepository) {
        try{
            Optional<UserEntity> userSearched = userRepository.findByUserAndTag(user, tag);

            if(userSearched.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new APIResponse("Usuário não encontrado."));
            }

            return ResponseEntity.ok(new GetProfileResponse(
                userSearched.get().getUser(),
                userSearched.get().getTag(),
                userSearched.get().getEmail(),
                userSearched.get().getDescription(),
                userSearched.get().getValorantUsername(),
                userSearched.get().getValorantTag(),
                "Perfil carregado com sucesso."
            ));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new APIResponse("Não foi possível ler o perfil do usuário."));
        }
    }

    public static ResponseEntity<APIResponse> UpdateProfile(UpdateProfileRequestDTO request, String user, String tag, UserRepository userRepository) {
        try{
            Optional<UserEntity> userSearched = userRepository.findByUserAndTag(user, tag);

            if(userSearched.isEmpty()) {
                return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new APIResponse("Usuário não encontrado."));
            }

            //Check if the old password is correct
            if(!new BCryptPasswordEncoder().matches(request.getOldPassword(), userSearched.get().getPassword())) {
                return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new APIResponse("Senha antiga inválida."));
            }

            //Check if the new username and tag is already in use
            Optional<UserEntity> existingUser = userRepository.findByUserAndTag(request.getNewUsername(), request.getNewTag());
            if(!existingUser.isEmpty()) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new APIResponse("Nome de usuário e tag já em uso."));
            }

            //Update the user
            userSearched.get().setUser(request.getNewUsername());
            userSearched.get().setTag(request.getNewTag());
            userSearched.get().setDescription(request.getNewDescription());
            userSearched.get().setEncodedPassword(request.getNewPassword());
            userSearched.get().setValorantUsername(request.getValorantUsername());
            userSearched.get().setValorantTag(request.getValorantTag());
            userRepository.save(userSearched.get());

            return ResponseEntity
                .ok()
                .body(new APIResponse("Perfil atualizado com sucesso."));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new APIResponse("Erro interno do servidor. Tente novamente mais tarde."));
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
