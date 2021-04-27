package com.Bug_Tracker.service;

import com.Bug_Tracker.Model.User;

import java.util.List;

public interface UserService {
    void register(String firstName, String lastName, String username, String password, String email);


    User findUserByUsername(String username);
    List<User> getUsers();
    void deleteUser(String id);



}
