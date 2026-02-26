package org.app_backend.demeter.configuration;

import org.app_backend.demeter.model.UserModel;
import org.app_backend.demeter.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModel =  userRepository.
                findByPhoneNo(username).orElseThrow(() ->
                        new UsernameNotFoundException("User not found with phone number: " + username));
        return new UserPrincipal(userModel);
    }
}
