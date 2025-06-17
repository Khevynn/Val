package com.olimpo.Services;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Autowired;

import com.olimpo.DTO.Requests.LoginRequestDTO;
import com.olimpo.DTO.Requests.RegisterRequestDTO;
import com.olimpo.DTO.Requests.UpdateProfileRequestDTO; 
import com.olimpo.DTO.Responses.APIResponse;
import com.olimpo.DTO.Responses.GetProfileResponse;
import com.olimpo.DTO.Responses.LoginResponseDTO;
import com.olimpo.Entity.AccountStatus;
import com.olimpo.Entity.UserEntity;
import com.olimpo.Repository.UserRepository;
import com.olimpo.Utils.PasswordUtils;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class UserServices {
    // Dependencies
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Constants
    private static final String ACCOUNT_BANNED_OR_DELETED = "Conta excluída ou banida!";
    private static final int MAX_TAG_GENERATION_ATTEMPTS = 100;
    private static final int TAG_LENGTH = 4;
    private static final int MAX_TAG_LENGTH = 5;
    private static final String TAG_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // Authentication Methods
    public ResponseEntity<?> refreshToken(String refreshToken, HttpServletResponse response) {
        String userEmail = tokenService.validateRefreshToken(refreshToken);

        if (userEmail == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new APIResponse("Refresh token inválido"));
        }

        UserEntity user = getUserOrThrow(userEmail);
        String accessToken = generateAccessAndRefreshTokens(user, response);

        return ResponseEntity.ok().body(Map.of("accessToken", accessToken));
    }

    public ResponseEntity<LoginResponseDTO> loginUser(LoginRequestDTO request, HttpServletResponse response) {
        try {
            UserEntity user = getUserOrThrow(request.getEmail());

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(new LoginResponseDTO(null, "E-mail ou senha inválidos."));
            }

            if(isAccountBannedOrDeleted(user)){
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new LoginResponseDTO(null, ACCOUNT_BANNED_OR_DELETED));
            }

            String accessToken = generateAccessAndRefreshTokens(user, response);
            return ResponseEntity.ok(new LoginResponseDTO(accessToken, "Login bem-sucedido"));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new LoginResponseDTO(null, "Erro interno do servidor. Tente novamente mais tarde."));
        }
    }

    public ResponseEntity<APIResponse> logout(String authenticatedUserEmail, HttpServletResponse response) {
        try {
            UserEntity user = getUserOrThrow(authenticatedUserEmail);
            user.setRefreshToken(null);
            userRepository.save(user);
            sendRefreshTokenCookie(response, "");

            return ResponseEntity
                .ok()
                .body(new APIResponse("Logout feito com sucesso."));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new APIResponse("Erro interno do servidor. Tente novamente mais tarde."));
        }
    }

    // User Management Methods
    public ResponseEntity<APIResponse> registerUser(RegisterRequestDTO request) {
        try {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {  
                return ResponseEntity
                        .badRequest()
                        .body(new APIResponse("E-mail já existe.")); 
            }
            
            if (!PasswordUtils.isPasswordStrong(request.getPassword())) {
                return ResponseEntity
                    .badRequest()
                    .body(new APIResponse("A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número."));
            }

            String tag = generateUniqueTag(request.getUser());
            if (tag == null) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new APIResponse("Não há tags disponíveis para esse usuário, tente com outro usuário."));
            }

            UserEntity user = new UserEntity();
            user.setEmail(request.getEmail());
            user.setUser(request.getUser());
            user.setTag(tag);
            user.setPassword(getEncodedPassword(request.getPassword()));
            user.setAccountStatus(AccountStatus.Activated);
            userRepository.save(user);
            
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

    public ResponseEntity<APIResponse> deleteUser(String authenticatedUserEmail) {
        try {
            UserEntity user = getUserOrThrow(authenticatedUserEmail);

            if(isAccountBannedOrDeleted(user)){
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new APIResponse(ACCOUNT_BANNED_OR_DELETED));
            }
            
            user.setAccountStatus(AccountStatus.Deleted);
            userRepository.save(user);

            return ResponseEntity
                .ok()
                .body(new APIResponse("Perfil deletado com sucesso."));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new APIResponse("Erro interno do servidor. Tente novamente mais tarde."));
        }
    }

    // Profile Management Methods
    public ResponseEntity<APIResponse> getProfileByUserAndTag(String user, String tag) {
        try {
            Optional<UserEntity> userSearched = userRepository.findByUserAndTag(user, tag);

            if(userSearched.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new APIResponse("Usuário não encontrado."));
            }

            String userEmail = userSearched.get().getEmail().equals(SecurityContextHolder.getContext().getAuthentication().getName())
                                 ? userSearched.get().getEmail() 
                                 : null;

            return ResponseEntity.ok(new GetProfileResponse(
                userSearched.get().getUser(),
                userSearched.get().getTag(),
                userEmail,
                userSearched.get().getDescription(),
                userSearched.get().getValorantUsername(),
                userSearched.get().getValorantTag(),
                userSearched.get().getAccountStatus(),
                "Perfil carregado com sucesso."
            ));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new APIResponse("Não foi possível ler o perfil do usuário."));
        }
    }

    public ResponseEntity<APIResponse> getProfileByEmail(String email) {
        try {
            UserEntity user = getUserOrThrow(email);

            return ResponseEntity.ok(new GetProfileResponse(
                    user.getUser(),
                    user.getTag(),
                    user.getEmail(),
                    user.getDescription(),
                    user.getValorantUsername(),
                    user.getValorantTag(),
                    user.getAccountStatus(),
                    "Perfil carregado com sucesso."
                ));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new APIResponse("Não foi possível ler o perfil do usuário."));
        }
    }

    public ResponseEntity<APIResponse> updateProfile(UpdateProfileRequestDTO request, String authenticatedUserEmail) {
        try {
            UserEntity user = getUserOrThrow(authenticatedUserEmail);

            if(isAccountBannedOrDeleted(user)){
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new APIResponse(ACCOUNT_BANNED_OR_DELETED));
            }

            ResponseEntity<APIResponse> validationResponse = validateProfileUpdate(request, user);
            if (validationResponse != null) {
                return validationResponse;
            }

            updateUserProfile(user, request);
            return ResponseEntity.ok().body(new APIResponse("Perfil atualizado com sucesso."));

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity
                    .internalServerError()
                    .body(new APIResponse("Erro interno do servidor. Tente novamente mais tarde."));
        }
    }

    // Helper Methods - Authentication
    private String generateAccessAndRefreshTokens(UserEntity user, HttpServletResponse response) {
        String accessToken = tokenService.generateAccessToken(user);
        String refreshToken = tokenService.generateRefreshToken(user);

        user.setRefreshToken(refreshToken);
        userRepository.save(user);
        sendRefreshTokenCookie(response, refreshToken);

        return accessToken;
    }

    private void sendRefreshTokenCookie(HttpServletResponse response, String token) {
        ResponseCookie cookie = ResponseCookie.from("refresh_token", token)
            .httpOnly(true)
            .secure(false)
            .path("/auth/refresh")
            .maxAge(5 * 24 * 60 * 60)
            .sameSite("Strict")
            .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    // Helper Methods - User Management
    private String generateUniqueTag(String username) {
        List<UserEntity> existingUsers = userRepository.findAllByUser(username);
        Set<String> usedTags = existingUsers.stream()
            .map(UserEntity::getTag)
            .collect(Collectors.toSet());

        int attempts = 0;
        String tag;
        do {
            tag = generateRandomTag();
            attempts++;
            if (attempts >= MAX_TAG_GENERATION_ATTEMPTS) {
                return null;
            }
        } while (usedTags.contains(tag));

        return tag;
    }

    private String generateRandomTag() {
        StringBuilder tag = new StringBuilder();
        for (int i = 0; i < TAG_LENGTH; i++) {
            tag.append(TAG_CHARS.charAt((int)(Math.random() * TAG_CHARS.length())));
        }
        return tag.toString();
    }

    // Helper Methods - Profile Management
    private ResponseEntity<APIResponse> validateProfileUpdate(UpdateProfileRequestDTO request, UserEntity user) {
        if(!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            return ResponseEntity
                .badRequest()
                .body(new APIResponse("As senhas não coincidem."));
        }

        if (!PasswordUtils.isPasswordStrong(request.getNewPassword())) {
            return ResponseEntity
                .badRequest()
                .body(new APIResponse("A nova senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número."));
        }
        
        if(request.getNewTag().length() > MAX_TAG_LENGTH) {
            return ResponseEntity
                    .badRequest()
                    .body(new APIResponse("Tag precisa ter 5 caracteres ou menos."));
        }

        if(!request.getNewTag().matches("^[A-Za-z0-9]+$")) {
            return ResponseEntity
                    .badRequest()
                    .body(new APIResponse("Tag deve conter apenas letras e números."));
        }
        
        if(!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new APIResponse("Senha antiga inválida."));
        }

        Optional<UserEntity> existingUser = userRepository.findByUserAndTag(request.getNewUsername(), request.getNewTag());
        if(!existingUser.isEmpty()) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new APIResponse("Nome de usuário e tag já em uso."));
        }

        return null;
    }

    private void updateUserProfile(UserEntity user, UpdateProfileRequestDTO request) {
        user.setUser(request.getNewUsername());
        user.setTag(request.getNewTag());
        user.setDescription(request.getNewDescription());
        user.setPassword(getEncodedPassword(request.getNewPassword()));
        user.setValorantUsername(request.getValorantUsername());
        user.setValorantTag(request.getValorantTag());
        userRepository.save(user);
    }

    // Helper Methods - General
    private UserEntity getUserOrThrow(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado."));
    }

    private Boolean isAccountBannedOrDeleted(UserEntity user) {
        return user.getAccountStatus() != AccountStatus.Activated;
    }

    private String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}