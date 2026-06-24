package com.deepak.estateflow.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.deepak.estateflow.enums.LeadStatus;
import com.deepak.estateflow.entity.Lead;
import com.deepak.estateflow.repository.LeadRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeadService {
    public Page<Lead> getAllLeads(Pageable pageable) {
        return leadRepository.findAll(pageable);
    }

    public Page<Lead> getLeadsByStatus(LeadStatus status, Pageable pageable) {
        return leadRepository.findByStatus(status, pageable);
    }

    public Page<Lead> searchLeads(String keyword, Pageable pageable) {
        return leadRepository.searchLeads(keyword, pageable);
    }
    public Lead updateLead(Long id, Lead updatedLead) {

        Lead existingLead = leadRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Lead not found"));

        existingLead.setName(updatedLead.getName());
        existingLead.setPhone(updatedLead.getPhone());
        existingLead.setEmail(updatedLead.getEmail());
        existingLead.setBudget(updatedLead.getBudget());
        existingLead.setInterestedProperty(
                updatedLead.getInterestedProperty()
        );
        existingLead.setStatus(updatedLead.getStatus());

        return leadRepository.save(existingLead);
    }
    public Lead getLeadById(Long id) {

        return leadRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Lead not found"));
    }

    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    public Lead saveLead(Lead lead) {
        return leadRepository.save(lead);
    }
    public Lead updateLeadStatus(Long id, LeadStatus status) {

        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        lead.setStatus(status);

        return leadRepository.save(lead);
    }
    public void deleteLead(Long id) {

        if (!leadRepository.existsById(id)) {
            throw new RuntimeException("Lead not found");
        }

        leadRepository.deleteById(id);
    }

}