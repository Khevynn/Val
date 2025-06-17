package com.olimpo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.olimpo.DTO.Requests.LoginRequestDTO;
import com.olimpo.DTO.Requests.RegisterRequestDTO;
import com.olimpo.DTO.Requests.UpdateProfileRequestDTO;

import com.olimpo.DTO.Responses.APIResponse;
import com.olimpo.DTO.Responses.LoginResponseDTO;
import com.olimpo.Routes.APIRoutes;
import com.olimpo.Services.UserServices;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
public class UserController {

    @Autowired
    private UserServices userServices;

    @CrossOrigin(origins = "*")
    @PostMapping("auth/refresh")
    public ResponseEntity<?> callRefreshToken(@CookieValue(name = "refresh_token", required = false) String refreshToken, HttpServletResponse response){
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return userServices.refreshToken(refreshToken, response);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(APIRoutes.USER_REGISTER_ROUTE)
    public ResponseEntity<APIResponse> callRegistration(@RequestBody @Valid RegisterRequestDTO request) {
        return userServices.registerUser(request);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(APIRoutes.USER_LOGIN_ROUTE)
    public ResponseEntity<LoginResponseDTO> callLogin(@RequestBody @Valid LoginRequestDTO request, HttpServletResponse response) {
        return userServices.loginUser(request, response);
    }

    @CrossOrigin(origins = "*")
    @GetMapping(APIRoutes.USER_GET_OWN_PROFILE_ROUTE)
    public ResponseEntity<APIResponse> callGetOwnProfile() {
        String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userServices.getProfileByEmail(authenticatedUserEmail);
    }

    @CrossOrigin(origins = "*")
    @GetMapping(APIRoutes.USER_GET_PROFILE_ROUTE)
    public ResponseEntity<APIResponse> callGetProfile(@PathVariable String user, @PathVariable String tag) {
        if(user.isEmpty() || tag.isEmpty()) {
            return ResponseEntity
                .badRequest()
                .body(new APIResponse("Usuário ou tag não encontrados."));
        }

        return userServices.getProfileByUserAndTag(user, tag);
    }

    @CrossOrigin(origins = "*")
    @PutMapping(APIRoutes.USER_UPDATE_PROFILE_ROUTE)
    public ResponseEntity<APIResponse> callUpdateProfile(@RequestBody @Valid UpdateProfileRequestDTO request) {
        String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userServices.updateProfile(request, authenticatedUserEmail);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping(APIRoutes.USER_DELETE_ROUTE)
    public ResponseEntity<APIResponse> callDeleteUser() {
        String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userServices.deleteUser(authenticatedUserEmail);
    }

    @CrossOrigin(origins = "*")
    @GetMapping(APIRoutes.USER_LOGOUT_ROUTE)
    public ResponseEntity<APIResponse> callLogout(HttpServletResponse response) {
        String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userServices.logout(authenticatedUserEmail, response);
    }
}
