package com.fibboproject.backend.controller;

import com.fibboproject.backend.dto.AuthDto;
import com.fibboproject.backend.dto.AuthResponseDto;
import com.fibboproject.backend.dto.UserDto;
import com.fibboproject.backend.entity.User;
import com.fibboproject.backend.service.TokenService;
import com.fibboproject.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserService userService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public AuthResponseDto login(@RequestBody AuthDto authDto) {
        UsernamePasswordAuthenticationToken usernamePassword =
                new UsernamePasswordAuthenticationToken(authDto.username(), authDto.password());

        Authentication auth = authenticationManager.authenticate(usernamePassword);

        String token = tokenService.generateToken(auth.getName());
        User user = userService.loadUserByUsername(auth.getName());

        UserDto userDto = new UserDto(user.getId(), user.getName(), user.getDescription(), user.getEmail());

        return new AuthResponseDto(token, userDto);
    }
}
