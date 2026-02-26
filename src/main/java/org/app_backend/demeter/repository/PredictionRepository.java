package org.app_backend.demeter.repository;

import org.app_backend.demeter.model.PredictionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PredictionRepository extends JpaRepository<PredictionModel, UUID> {
}
