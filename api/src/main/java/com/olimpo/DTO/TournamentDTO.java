package com.olimpo.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

public class TournamentDTO {
    
    @Getter
    private int id;

    @NotBlank(message = "O torneio deve ter um organizador")
    @Getter @Setter
    private int ownerId;
    
    @NotBlank(message = "O torneio deve ter um nome")
    @Getter @Setter
    private String tournamentName;

    @NotBlank(message = "O torneio deve ter uma premiação")
    @Getter @Setter
    private float prizePool;

    public TournamentDTO(int ownerId, String tournamentName, float prizePool){
        this.ownerId = ownerId;
        this.tournamentName = tournamentName;
        this.prizePool = prizePool;
    }
}
