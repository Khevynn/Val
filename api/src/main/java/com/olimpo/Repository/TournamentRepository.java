package com.olimpo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.olimpo.Entity.TournamentEntity;

public interface TournamentRepository extends JpaRepository<TournamentEntity, Integer> {
    
    Optional<TournamentEntity> findTournamentById(int id);

}
