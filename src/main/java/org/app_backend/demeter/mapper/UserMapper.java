package org.app_backend.demeter.mapper;

import org.app_backend.demeter.dto.UserRequest;
import org.app_backend.demeter.model.UserModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    @Autowired
    private ModelMapper mapper;


    public UserRequest convertToUserRequest(UserModel userModel) {
        if (userModel == null)
            throw new RuntimeException("An error occurred while converting user model to user request");
        else
            return mapper.map (userModel, UserRequest.class);
    }

    public UserModel convertToUserModel(UserRequest userRequest) {
        if (userRequest == null)
            throw new RuntimeException("An error occurred while converting user request to user model");
        else
            return mapper.map (userRequest, UserModel.class);
    }

}
