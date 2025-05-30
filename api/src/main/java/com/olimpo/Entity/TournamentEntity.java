package com.olimpo.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="tournaments")
public class TournamentEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private int id;

    @Column(name = "owner_id")
    @Getter @Setter
    private int ownerId;

    @Column(name = "tournament_name")
    @Getter @Setter
    private String tournamentName;

    @Column(name = "prize_pool")
    @Getter @Setter
    private float prizePool;

}
