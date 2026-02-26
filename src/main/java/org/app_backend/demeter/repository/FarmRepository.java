package org.app_backend.demeter.repository;

import org.app_backend.demeter.model.FarmModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FarmRepository extends JpaRepository<FarmModel, UUID> {
}
