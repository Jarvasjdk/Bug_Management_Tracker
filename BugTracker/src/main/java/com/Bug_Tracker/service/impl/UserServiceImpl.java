package com.Bug_Tracker.service.impl;
import com.Bug_Tracker.enumeration.Role;

import com.Bug_Tracker.Model.User;
import com.Bug_Tracker.Model.UserPrincipal;
import com.Bug_Tracker.repository.UserRepository;
import com.Bug_Tracker.service.UserService;
import org.apache.commons.lang3.RandomStringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;


@Transactional // data safety precaution especially for CRUD operations
@Service // same functionality as component except its service annotation
@Qualifier("UserDetailService") // this allows us to inject it directly to a method
public class UserServiceImpl implements UserService, UserDetailsService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private String generateUserId() {
        return RandomStringUtils.randomNumeric(10);
    }
    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    @Override
    public void register(String firstName, String lastName, String username, String password, String email)  {

        User user = new User();
        user.setUserId(generateUserId());
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(encodePassword(password));
        user.setActive(true);
        user.setRole(Role.ROLE_USER.name());
        user.setAuthorities(Role.ROLE_USER.getAuthorities());
        userRepository.save(user); // saves user in mysql database

    }



    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(String username) {
        User user = userRepository.findUserByUsername(username);
        userRepository.deleteById(user.getId());

    }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if(user == null){ throw new UsernameNotFoundException("User not found by username: " + username);}
        else
        {
            userRepository.save(user);
            UserPrincipal userPrincipal = new UserPrincipal(user);
            return userPrincipal;
        }

    }
}
