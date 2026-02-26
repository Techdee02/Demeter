package org.app_backend.demeter.service;

import org.app_backend.demeter.model.FarmModel;
import org.app_backend.demeter.repository.FarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ServiceUtils {

    @Autowired
    private FarmRepository farmRepository;

    public FarmModel getFarm(UUID farmId) {
        return farmRepository.findById(farmId)
                .orElseThrow(() -> new RuntimeException("farm data not found"));
    }
}
