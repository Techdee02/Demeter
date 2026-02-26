package org.app_backend.demeter.mapper;

import org.app_backend.demeter.dto.FarmRequest;
import org.app_backend.demeter.model.FarmModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FarmMapper {

    @Autowired
    private ModelMapper mapper;

    public FarmModel convertToFarmModel(FarmRequest farmRequest) {
        if(farmRequest == null)
            throw new RuntimeException("An error occurred while converting farm request to farm model");
        return mapper.map(farmRequest, FarmModel.class);
    }

    public FarmRequest convertToFarmRequest(FarmModel farmModel) {
        if(farmModel == null)
            throw new RuntimeException("An error occurred while converting farm model to farm request");
        return mapper.map(farmModel, FarmRequest.class);
    }
}
