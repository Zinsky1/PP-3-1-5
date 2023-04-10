package com.example.overcome.service;

import com.example.overcome.model.User;

import javax.transaction.Transactional;
import java.util.List;

public interface UserService {

    @Transactional
    void add(User user);

    List<User> listUsers();

    User getUser(Long id);

    @Transactional
    void deleteUser(Long id);
    @Transactional
    void updateUser(User user);


    User findByEmail(String email);

}
