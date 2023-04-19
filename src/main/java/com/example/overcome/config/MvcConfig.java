package com.example.overcome.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/api/admin").setViewName("main");
        registry.addViewController("/userPage").setViewName("userPage");
        registry.addViewController("/login").setViewName("login2");
        registry.addViewController("/logout").setViewName("logout2");
        registry.addViewController("/").setViewName("home");
    }
}