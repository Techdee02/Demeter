package org.app_backend.demeter.mapper;

import org.app_backend.demeter.dto.SensordataRequest;
import org.app_backend.demeter.model.SensordataModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SensordataMapper {
    @Autowired
    private ModelMapper mapper;


    public SensordataRequest convertToSensordataRequest(SensordataModel sensordataModel) {
        if(sensordataModel == null)
            throw new RuntimeException("An error occurred while converting sensordata model to sensordata request");
        else
            return mapper.map(sensordataModel,SensordataRequest.class);
    }


    public SensordataModel convertToSensordataModel(SensordataRequest sensordataRequest) {
        if(sensordataRequest == null)
            throw new RuntimeException("An error occurred while converting sensordata request to sensordata model");
        else
            return mapper.map(sensordataRequest,SensordataModel.class);
    }

}
