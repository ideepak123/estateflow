package com.deepak.estateflow.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "properties")
@Data
@EqualsAndHashCode(callSuper = true) // CRITICAL: Required when extending a base class with @Data
public class Property extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Double price;

    private String location;

    // TODO: Change this to an Enum (PropertyStatus) to prevent bad data insertion
    private String status;

    // Wires the property back to the specific sales agent managing it
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id")
    private User assignedAgent;
}