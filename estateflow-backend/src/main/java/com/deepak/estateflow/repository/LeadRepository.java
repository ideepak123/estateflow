package com.deepak.estateflow.repository;

import com.deepak.estateflow.entity.Lead;
import com.deepak.estateflow.enums.LeadStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LeadRepository extends JpaRepository<Lead, Long> {
    long countByStatus(LeadStatus status);
    Page<Lead> findByStatus(LeadStatus status, Pageable pageable);

    @Query("SELECT l FROM Lead l WHERE " +
            "LOWER(l.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(l.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(l.phone) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Lead> searchLeads(@Param("keyword") String keyword, Pageable pageable);
}