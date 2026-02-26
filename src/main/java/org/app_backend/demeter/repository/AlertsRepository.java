package org.app_backend.demeter.repository;

import org.app_backend.demeter.model.AlertModel;
import org.app_backend.demeter.model.FarmModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AlertsRepository extends JpaRepository<AlertModel, UUID> {

    List<AlertModel> findByFarm(FarmModel farm);
}
