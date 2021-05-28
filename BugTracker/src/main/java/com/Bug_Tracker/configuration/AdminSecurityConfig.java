package com.Bug_Tracker.configuration;

import com.Bug_Tracker.filter.JWTAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

// the reason i needed to make another configuration class is theres no way to have two overridding configure methods in one class
// then since i had to create another security config class i needed another authentication manager. since there were two auth managers, i had to use qualifer to specify which one i wanted
@Configuration
@EnableWebSecurity
public class AdminSecurityConfig extends WebSecurityConfigurerAdapter {

    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserDetailsService userDetailsService2;
    @Autowired
    public AdminSecurityConfig(@Qualifier("adminServiceImpl") UserDetailsService userDetailsService2
            ,BCryptPasswordEncoder bCryptPasswordEncoder) {


        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userDetailsService2 = userDetailsService2;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService2).passwordEncoder(bCryptPasswordEncoder);
    }

   @Bean
   @Qualifier("auth2")
    public AuthenticationManager authenticationManagerBean2() throws Exception {
        return super.authenticationManagerBean();
    }
}
