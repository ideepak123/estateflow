package com.deepak.estateflow.controller;

import com.deepak.estateflow.dto.DashboardDTO;
import com.deepak.estateflow.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService
    ) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard")
    public DashboardDTO getDashboard() {

        return dashboardService.getDashboardStats();
    }
}