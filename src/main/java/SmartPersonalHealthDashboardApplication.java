package com.java;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class SmartPersonalHealthDashboardApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(SmartPersonalHealthDashboardApplication.class);
    }

	public static void main(String[] args) {
		SpringApplication.run(SmartPersonalHealthDashboardApplication.class, args);

	}

}
