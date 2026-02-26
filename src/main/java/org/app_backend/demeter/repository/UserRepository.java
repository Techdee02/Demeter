package org.app_backend.demeter.repository;

import org.app_backend.demeter.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel,Long> {


    Optional<UserModel> findByPhoneNo(String phoneNo);
}
