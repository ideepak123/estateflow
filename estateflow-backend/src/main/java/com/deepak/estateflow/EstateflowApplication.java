package com.deepak.estateflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl") // CRITICAL: Turns on the automatic timestamps and user tracking
public class EstateflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(EstateflowApplication.class, args);
	}
}