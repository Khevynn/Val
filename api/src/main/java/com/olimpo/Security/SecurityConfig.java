package com.olimpo.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.olimpo.Routes.APIRoutes;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // desativa CSRF para APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(APIRoutes.USER_DELETE_ROUTE, APIRoutes.USER_GET_PROFILE_ROUTE, APIRoutes.USER_LOGIN_ROUTE,
                APIRoutes.USER_REGISTER_ROUTE, APIRoutes.USER_UPDATE_PROFILE_ROUTE, "/error", "/h2-console/**").permitAll()
                .anyRequest().authenticated()
            )
            .httpBasic(httpBasic -> httpBasic.disable()) // desativa login básico
            .formLogin(form -> form.disable()); // desativa form login

        return http.build();
    }
}
