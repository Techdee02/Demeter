package org.app_backend.demeter.service;

import org.app_backend.demeter.dto.FarmRequest;
import org.app_backend.demeter.dto.WeatherRequest;
import org.app_backend.demeter.model.FarmModel;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;
import java.util.UUID;

@Service
public class WeatherService {

    @Autowired
    private WebClient webClient;
    @Value("${WEATHER_API_KEY}")
    private static String WEATHER_API_KEY;
    @Value("${POLY_ID}")
    private static String POLY_ID;
    @Autowired
    private FarmService farmService;

    public Map readWeatherData(UUID farmId) {
        try {
            FarmRequest farmRequest = farmService.getFarmByID(farmId);
            return webClient.get().uri(new URI(String.
                    format("/weather?lat=%f&lon=%f&appid=%s", farmRequest.getLatitude(),farmRequest.getLongitude(), WEATHER_API_KEY)))
                    .retrieve()
                    .bodyToMono(Map.class).block();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    public Map readCurrentSoilData() {
        try {
            return webClient.get().uri(new URI(String.
                            format("/agro?polyid=%s&appid=%s", POLY_ID,WEATHER_API_KEY)))
                    .retrieve()
                    .bodyToMono(Map.class).block();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }
}
