package com.olimpo.DTO.Requests;

import lombok.Getter;

@Getter
public class UpdateProfileRequestDTO {
    private String newUsername;
    private String newTag;

    private String newDescription;

    private String oldPassword;
    private String newPassword;
    private String confirmNewPassword;
    
    private String valorantUsername;
    private String valorantTag;

    public UpdateProfileRequestDTO(String newUsername, String oldPassword, 
                                    String newPassword, String confirmNewPassword, String newTag, 
                                    String newDescription, String valorantUsername, String valorantTag) {
        this.newUsername = newUsername;
        this.newTag = newTag;
        this.newDescription = newDescription;

        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.confirmNewPassword = confirmNewPassword;

        this.valorantUsername = valorantUsername;
        this.valorantTag = valorantTag;
    }
}
