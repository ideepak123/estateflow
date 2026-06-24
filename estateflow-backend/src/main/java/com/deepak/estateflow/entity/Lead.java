package com.deepak.estateflow.entity;

import com.deepak.estateflow.enums.LeadStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "leads")
@Data
@EqualsAndHashCode(callSuper = true) // Required since we are extending a base class
public class Lead extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone is required")
    private String phone;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotNull(message = "Budget is required")
    private Double budget;

    @NotBlank(message = "Interested property is required")
    private String interestedProperty;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Status is required")
    private LeadStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id")
    private User assignedAgent;
}