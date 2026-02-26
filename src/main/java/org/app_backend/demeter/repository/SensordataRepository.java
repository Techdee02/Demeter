package org.app_backend.demeter.repository;

import org.app_backend.demeter.model.FarmModel;
import org.app_backend.demeter.model.SensordataModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SensordataRepository extends JpaRepository<SensordataModel, UUID> {

    Optional<SensordataModel> findTopByOrderByTimestampDesc(FarmModel farm);
    List<SensordataModel> findByTimestampBetweenAndFarm(LocalDateTime from, LocalDateTime to, FarmModel farm);
    Optional<SensordataModel> findByFarm(FarmModel farm);
}
