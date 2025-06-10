import { NavigateFunction } from "react-router-dom";

export const goToLogin = (navigate: NavigateFunction) => navigate("/login");
export const goToRegister = (navigate: NavigateFunction) => navigate("/register");
export const goToIndex = (navigate: NavigateFunction) => navigate("/");
export const goToHome = (navigate: NavigateFunction) => navigate("/home");
