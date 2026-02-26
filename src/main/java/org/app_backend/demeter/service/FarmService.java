package org.app_backend.demeter.service;

import org.app_backend.demeter.dto.FarmRequest;
import org.app_backend.demeter.mapper.FarmMapper;
import org.app_backend.demeter.model.FarmModel;
import org.app_backend.demeter.repository.FarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class FarmService {

    @Autowired
    private FarmMapper farmMapper;
    @Autowired
    private FarmRepository farmRepository;


    public Map<String,Object> createFarm(FarmRequest farmRequest) {
        FarmModel farmModel = farmMapper.convertToFarmModel(farmRequest);
        farmRepository.save(farmModel);

        return Map.of("message","farm created successfully", "data", farmRequest);
    }

    public List<FarmRequest> getFarms() {
        return Optional.of(farmRepository.findAll()
                .stream().map(farmMapper::convertToFarmRequest)
                .toList()).orElseThrow(() -> new RuntimeException("Farm data not found."));
    }

    public FarmRequest getFarmByID(UUID id) {
        return farmRepository.findById(id)
                .map(farmMapper::convertToFarmRequest)
                .orElseThrow(() -> new RuntimeException("Farm data not found with id: "+id));
    }

    public Map<String,Object> updateFarmByID(UUID id, FarmRequest farmRequest) {
        FarmModel farmModel = farmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Farm data not found with id: "+id));

        FarmModel newFarmModel = farmMapper.convertToFarmModel(farmRequest);
        newFarmModel.setId(farmModel.getId());

        farmRepository.save(newFarmModel);

        return Map.of("message", "farm data with id: "+id+" updated successfully", "data", farmRequest);
    }

    public Map<String,Object> deleteFarmByID(UUID id) {
        farmRepository.deleteById(id);
        return Map.of("message", "farm data with id: "+id+" removed successfully");
    }


}
