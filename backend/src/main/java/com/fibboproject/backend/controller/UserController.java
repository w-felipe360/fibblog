package com.fibboproject.backend.controller;

import com.fibboproject.backend.dto.CreateUserDto;
import com.fibboproject.backend.dto.UserDto;
import com.fibboproject.backend.entity.User;
import com.fibboproject.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    @GetMapping
    public ResponseEntity getAllUsers() {
        var allUsers = userService.getAllUsers();
        return ResponseEntity.ok(allUsers);
    }
    @PostMapping
        public ResponseEntity<UserDto> createUser(@RequestBody @Valid CreateUserDto data) {
            User createdUser = userService.createUser(data);
            UserDto responseDto = new UserDto(createdUser.getId(), createdUser.getName(), null, createdUser.getUsername());
            return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
        }
    }
