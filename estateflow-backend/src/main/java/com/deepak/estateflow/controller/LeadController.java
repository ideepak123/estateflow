package com.deepak.estateflow.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.deepak.estateflow.enums.LeadStatus;
import com.deepak.estateflow.entity.Lead;
import com.deepak.estateflow.service.LeadService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/leads")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }
    @GetMapping("/{id}")
    public Lead getLeadById(@PathVariable Long id) {
        return leadService.getLeadById(id);
    }



    @PostMapping
    public Lead createLead(@Valid @RequestBody Lead lead) {
        return leadService.saveLead(lead);
    }
    @PutMapping("/{id}/status")
    public Lead updateStatus(
            @PathVariable Long id,
            @RequestParam LeadStatus status) {

        return leadService.updateLeadStatus(id, status);
    }
    @PutMapping("/{id}")
    public Lead updateLead(
            @PathVariable Long id,
            @Valid @RequestBody Lead lead) {

        return leadService.updateLead(id, lead);
    }
    @DeleteMapping("/{id}")
    public String deleteLead(@PathVariable Long id) {

        leadService.deleteLead(id);

        return "Lead deleted successfully";
    }
    @GetMapping
    public Page<Lead> getAllLeads(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return leadService.getAllLeads(pageable);
    }

    @GetMapping("/search")
    public Page<Lead> searchLeads(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return leadService.searchLeads(keyword, PageRequest.of(page, size));
    }

    @GetMapping("/status/{status}")
    public Page<Lead> getLeadsByStatus(
            @PathVariable LeadStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return leadService.getLeadsByStatus(status, PageRequest.of(page, size));
    }

}