package com.olimpo.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import com.olimpo.Entity.UserEntity;
import com.olimpo.Repository.UserRepository;
import com.olimpo.Services.TokenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.olimpo.DTO.Responses.APIResponse;
import com.olimpo.Routes.APIRoutes;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String CONTENT_TYPE = "application/json";
    private static final String INVALID_TOKEN_MESSAGE = "Token inválido ou expirado.";

    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.equals(APIRoutes.REFRESH_TOKEN_ROUTE);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = recoverToken(request);
        
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String login = tokenService.validateAccessToken(token);
        if (login == null) {
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, INVALID_TOKEN_MESSAGE);
            return;
        }

        authenticateUser(login);
        filterChain.doFilter(request, response);
    }

    private void authenticateUser(String email) {
        UserEntity user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User Not Found"));
        
        var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        var authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            return null;
        }
        return authHeader.replace(BEARER_PREFIX, "");
    }

    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType(CONTENT_TYPE);
        APIResponse errorResponse = new APIResponse(message);
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}