package org.app_backend.demeter.service;

import org.app_backend.demeter.dto.SensordataRequest;
import org.app_backend.demeter.mapper.SensordataMapper;
import org.app_backend.demeter.model.FarmModel;
import org.app_backend.demeter.model.SensordataModel;
import org.app_backend.demeter.repository.SensordataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SensordataService {

    @Autowired
    private SensordataMapper sensordataMapper;
    @Autowired
    private SensordataRepository sensordataRepository;
    @Autowired
    private ServiceUtils serviceUtils;

    public SensordataRequest collectSensorData(SensordataRequest sensordataRequest) {
        SensordataModel sensordataModel = sensordataMapper.convertToSensordataModel(sensordataRequest);
        sensordataModel.setFarm(serviceUtils.getFarm(sensordataRequest.getFarmId()));
        sensordataRepository.save(sensordataModel);
        return sensordataRequest;
    }


    public SensordataRequest getLatestSensorData(UUID farmId) {
        return sensordataMapper.convertToSensordataRequest(sensordataRepository.findTopByOrderByTimestampDesc(serviceUtils.getFarm(farmId))
                .orElseThrow(() -> new RuntimeException("Sensor data not found.")));
    }

    public List<SensordataRequest> getHistoricalSensorData(UUID farmId, LocalDateTime from, LocalDateTime to) {
       return sensordataRepository.findByTimestampBetweenAndFarm(from, to, serviceUtils.getFarm(farmId))
                .stream().map(sensordataMapper::convertToSensordataRequest).toList();
    }
}
