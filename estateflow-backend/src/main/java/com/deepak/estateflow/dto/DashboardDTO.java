package com.deepak.estateflow.dto;

import lombok.Data;

@Data
public class DashboardDTO {

    private long totalUsers;

    private long totalProperties;

    private long availableProperties;

    private long soldProperties;

    private long totalLeads;

    private long newLeads;

    private long contactedLeads;

    private long bookedLeads;
}