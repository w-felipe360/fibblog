package com.fibboproject.backend.controller;

import com.fibboproject.backend.dto.CreatePostDto;
import com.fibboproject.backend.dto.CreateUserDto;
import com.fibboproject.backend.dto.PostDto;
import com.fibboproject.backend.dto.UserDto;
import com.fibboproject.backend.entity.Post;
import com.fibboproject.backend.entity.User;
import com.fibboproject.backend.service.PostService;
import com.fibboproject.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    @Autowired
    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }
    @PostMapping
    public ResponseEntity<PostDto> createPost(@RequestBody @Valid CreatePostDto data) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = (User) userService.loadUserByUsername(username);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN); // Handle this case appropriately
        }

        Post post = new Post(data.getTitle(), data.getDescription(), user);
        Post createdPost = postService.savePost(post);

        PostDto responseDto = new PostDto(
                createdPost.getId(),
                createdPost.getTitle(),
                createdPost.getDescription(),
                createdPost.getUser().getId()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }
    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        List<PostDto> postDtos = posts.stream()
                .map(post -> new PostDto(
                        post.getId(),
                        post.getTitle(),
                        post.getDescription(),
                        post.getUser().getId()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(postDtos);
    }

}
