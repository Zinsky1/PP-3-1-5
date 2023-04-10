package com.example.overcome.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("http://localhost:34568/user").setViewName("userPage");
        registry.addViewController("/api/admin").setViewName("main");
//        registry.addViewController("/login").setViewName("login2");
//        registry.addViewController("/logout").setViewName("logout2");
    }
}