package com.deepak.estateflow.service;

import com.deepak.estateflow.dto.DashboardDTO;
import com.deepak.estateflow.enums.LeadStatus;
import com.deepak.estateflow.repository.LeadRepository;
import com.deepak.estateflow.repository.PropertyRepository;
import com.deepak.estateflow.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final LeadRepository leadRepository;

    public DashboardService(
            UserRepository userRepository,
            PropertyRepository propertyRepository,
            LeadRepository leadRepository
    ) {
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
        this.leadRepository = leadRepository;
    }

    public DashboardDTO getDashboardStats() {

        DashboardDTO dto = new DashboardDTO();

        dto.setTotalUsers(userRepository.count());

        dto.setTotalProperties(propertyRepository.count());

        dto.setAvailableProperties(
                propertyRepository.countByStatus("AVAILABLE")
        );

        dto.setSoldProperties(
                propertyRepository.countByStatus("SOLD")
        );

        dto.setTotalLeads(
                leadRepository.count()
        );

        dto.setNewLeads(
                leadRepository.countByStatus(LeadStatus.NEW)
        );

        dto.setContactedLeads(
                leadRepository.countByStatus(LeadStatus.CONTACTED)
        );

        dto.setBookedLeads(
                leadRepository.countByStatus(LeadStatus.BOOKED)
        );

        return dto;
    }
}