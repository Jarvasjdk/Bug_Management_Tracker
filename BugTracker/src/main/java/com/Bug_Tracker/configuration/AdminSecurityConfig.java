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


@Configuration
@EnableWebSecurity

public class AdminSecurityConfig extends WebSecurityConfigurerAdapter {
    private JWTAuthorizationFilter JWTAuthorizationFilter;

    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserDetailsService userDetailsService2;
    @Autowired
    public AdminSecurityConfig(JWTAuthorizationFilter jwtAuthorizationFilter,

                                 @Qualifier("adminServiceImpl") UserDetailsService userDetailsService2
            ,BCryptPasswordEncoder bCryptPasswordEncoder) {
        JWTAuthorizationFilter = jwtAuthorizationFilter;

        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userDetailsService2 = userDetailsService2;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService2).passwordEncoder(bCryptPasswordEncoder);
    }




    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().and()
                .sessionManagement().sessionCreationPolicy(STATELESS)
                .and().authorizeRequests().antMatchers("/adminPortal/register","/adminPortal/login").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(JWTAuthorizationFilter, UsernamePasswordAuthenticationFilter.class); // this filter happens before all other filters
    }

   @Bean
   @Qualifier("auth2")
    public AuthenticationManager authenticationManagerBean2() throws Exception {
        return super.authenticationManagerBean();
    }
}
