package org.app_backend.demeter.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import lombok.extern.slf4j.Slf4j;
import org.app_backend.demeter.dto.AlertsRequest;
import org.app_backend.demeter.dto.FarmRequest;
import org.app_backend.demeter.mapper.AlertMapper;
import org.app_backend.demeter.model.AlertModel;
import org.app_backend.demeter.model.FarmModel;
import org.app_backend.demeter.repository.AlertsRepository;
import org.app_backend.demeter.repository.FarmRepository;
import org.app_backend.demeter.response.AlertResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
public class SmsService {

    @Autowired
    private AlertMapper alertMapper;
    @Autowired
    private FarmRepository farmRepository;
    @Autowired
    private AlertsRepository alertsRepository;
    @Autowired
    private ServiceUtils serviceUtils;
    @Autowired
    private WebClient webClient;

    @Value("${TWILIO.AUTH_TOKEN}")
    private String TWILIO_AUTH_TOKEN;
    @Value("${TWILIO.ACCOUNT_SID}")
    private String TWILIO_ACCOUNT_SID;
    @Value("${TWILIO.PHONE_NUMBER}")
    private String TWILIO_PHONE_NUMBER;

    public Map<String, Object> sendAlertViaSMS(AlertsRequest alertsRequest) {
        AlertModel alertModel = new AlertModel(
        );
        alertModel.setPhone(alertsRequest.phone());
        alertModel.setMessage(alertsRequest.message());
        alertModel.setFarm(serviceUtils.getFarm(alertsRequest.farm_id()));

        sendSMS(alertsRequest);

        alertModel.setSent_at(LocalDateTime.now());
        alertModel.setStatus("sent");
        alertModel.setAlert_type(alertsRequest.alert_type());

        alertsRepository.save(alertModel);
        return Map.of("message", "alert sent successfully");
    }

    private void sendSMS(AlertsRequest alertsRequest) {
        Twilio.init(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(alertsRequest.phone()),
                new com.twilio.type.PhoneNumber(TWILIO_PHONE_NUMBER),
                alertsRequest.message()
        ).create();
        log.info("message sent with SID: {}", message.getSid());
    }

    public List<AlertResponse> getAlertsHistory(UUID farmId) {
        return alertsRepository.findByFarm(serviceUtils.getFarm(farmId))
                .stream().map(alertMapper::convertToAlertResponse).toList();
    }


}














;









