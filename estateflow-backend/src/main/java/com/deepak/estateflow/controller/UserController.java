package com.deepak.estateflow.controller;

import com.deepak.estateflow.dto.UserResponseDTO;
import com.deepak.estateflow.entity.User;
import com.deepak.estateflow.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/paged")
    public Page<UserResponseDTO> getUsersPaginated(
            @RequestParam int page,
            @RequestParam int size) {

        return userService.getUsersPaginated(page, size);
    }

    @GetMapping("/sorted")
    public List<UserResponseDTO> getUsersSorted(
            @RequestParam String field) {

        return userService.getUsersSorted(field);
    }

}