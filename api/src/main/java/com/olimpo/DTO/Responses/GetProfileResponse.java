package com.olimpo.DTO.Responses;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class GetProfileResponse extends APIResponse{
    private String username;
    private String tag;
    private String email;
    private String description;
    private String valorant_username;
    private String valorant_tag;

    public GetProfileResponse(String username, String tag, String email, 
                                String description, String valorant_username, String valorant_tag, String message) {
        super(message);
        this.username = username;
        this.tag = tag;
        this.email = email;
        this.description = description;
        this.valorant_username = valorant_username;
        this.valorant_tag = valorant_tag;
    }
}
