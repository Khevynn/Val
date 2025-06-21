package com.olimpo.Utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtils {

    private static BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static boolean isPasswordStrong(String password) {
        return password != null && 
               password.length() >= 8 &&
               password.matches(".*[A-Z].*") &&
               password.matches(".*[a-z].*") &&
               password.matches(".*\\d.*");
    }
    
    public static String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public static Boolean passwordMatches(String password1, String password2){
        return passwordEncoder.matches(password1, password2);
    }
} 