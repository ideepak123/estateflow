package com.deepak.estateflow.dto;

import lombok.Data;
import com.deepak.estateflow.enums.Role;

@Data
public class UserResponseDTO {

    private Long id;
    private String name;
    private String email;
    private Role role;
}