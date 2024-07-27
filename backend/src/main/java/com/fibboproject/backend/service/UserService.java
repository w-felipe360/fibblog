package com.fibboproject.backend.service;

import com.fibboproject.backend.dto.CreateUserDto;
import com.fibboproject.backend.dto.UserDto;
import com.fibboproject.backend.entity.User;
import com.fibboproject.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(CreateUserDto createUserDto) {
        userRepository.findByEmail(createUserDto.email()).ifPresent(user -> {
            throw new IllegalArgumentException("Email already registered");
        });

        String hashedPassword = passwordEncoder.encode(createUserDto.password());
        User user = new User(
                createUserDto.name(),
                createUserDto.email(),
                hashedPassword,
                null
        );
        return userRepository.save(user);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDto(user.getId(), user.getName(), user.getDescription(), user.getEmail()))
                .collect(Collectors.toList());
    }

    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));
    }
}
