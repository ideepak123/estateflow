package com.deepak.estateflow.entity;

import com.deepak.estateflow.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    // A single sales agent manages multiple leads
    @OneToMany(mappedBy = "assignedAgent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // CRITICAL: Prevents infinite recursion during API JSON response
    @ToString.Exclude // CRITICAL: Prevents Lombok StackOverflow
    private List<Lead> assignedLeads = new ArrayList<>();

    // We will wire this one up when you drop the Property entity
    @OneToMany(mappedBy = "assignedAgent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<Property> assignedProperties = new ArrayList<>();
}