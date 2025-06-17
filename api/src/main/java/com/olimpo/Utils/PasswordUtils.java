package com.olimpo.Utils;

public class PasswordUtils {
    public static boolean isPasswordStrong(String password) {
        return password != null && 
               password.length() >= 8 &&
               password.matches(".*[A-Z].*") &&
               password.matches(".*[a-z].*") &&
               password.matches(".*\\d.*");
    }
} 