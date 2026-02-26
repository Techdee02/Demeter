package org.app_backend.demeter.mapper;

import org.app_backend.demeter.dto.AlertsRequest;
import org.app_backend.demeter.dto.FarmRequest;
import org.app_backend.demeter.model.AlertModel;
import org.app_backend.demeter.model.FarmModel;
import org.app_backend.demeter.response.AlertResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlertMapper {

    @Autowired
    private ModelMapper mapper;

    public AlertResponse convertToAlertResponse(AlertModel alertModel) {
        if(alertModel == null)
            throw new RuntimeException("An error occurred while converting ALERT model to ALERT response");
        return mapper.map(alertModel, AlertResponse.class);
    }


}
