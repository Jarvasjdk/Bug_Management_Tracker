package com.Bug_Tracker.service;

import com.Bug_Tracker.Model.User;
import com.Bug_Tracker.exception.domain.EmailExistException;
import com.Bug_Tracker.exception.domain.UsernameExistException;

import java.util.List;

public interface UserService {
    User register(String firstName, String lastName, String username, String password, String email) throws UsernameExistException, EmailExistException;


    User findUserByUsername(String username);
    List<User> getUsers();
    void deleteUser(String id);
   User findUserByEmail(String email);


}
