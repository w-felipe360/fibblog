package com.fibboproject.backend.service;

import com.fibboproject.backend.dto.CreateUserDto;
import com.fibboproject.backend.dto.UserDto;
import com.fibboproject.backend.entity.User;
import com.fibboproject.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(CreateUserDto createUserDto) {
        String hashedPassword = passwordEncoder.encode(createUserDto.password());
        User user = new User(
                createUserDto.username(),
                createUserDto.email(),
                hashedPassword
        );
        return userRepository.save(user);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDto(user.getId(), user.getUsername(), user.getEmail()))
                .collect(Collectors.toList());
    }
}
