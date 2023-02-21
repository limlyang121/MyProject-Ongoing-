package com.myapp.restapi.researchconference.Restservice;

import com.myapp.restapi.researchconference.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserRestService {
    List<User> findAll();
    List<User> findUserByRole(String roleName);

    List<User> searchByUsername(String username);

    List<User> searchByUsernameAndRole(String username, String roleName);

    User findByID(int userID);

    User findByUserName(String username);

    User save(User user);

    void delete(int userID);

    void deactivation(int userID);

    void activation(int userID);

}