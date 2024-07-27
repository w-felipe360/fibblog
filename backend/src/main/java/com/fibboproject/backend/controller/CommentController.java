package com.fibboproject.backend.controller;

import com.fibboproject.backend.dto.CreateCommentDto;
import com.fibboproject.backend.dto.CommentDto;
import com.fibboproject.backend.entity.Comment;
import com.fibboproject.backend.entity.Post;
import com.fibboproject.backend.entity.User;
import com.fibboproject.backend.service.CommentService;
import com.fibboproject.backend.service.PostService;
import com.fibboproject.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;
    private final UserService userService;

    @Autowired
    public CommentController(CommentService commentService, PostService postService, UserService userService) {
        this.commentService = commentService;
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping("{postId}")
    public ResponseEntity<List<CommentDto>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        List<CommentDto> commentDtos = comments.stream()
                .map(comment -> new CommentDto(
                        comment.getId(),
                        comment.getUser().getId(),
                        comment.getText(),
                        comment.getPost().getId()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(commentDtos);
    }
    @PostMapping("{postId}")
    public ResponseEntity<CommentDto> postComment(
            @PathVariable Long postId,
            @RequestBody @Valid CreateCommentDto createCommentDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDetails userDetails = userService.loadUserByUsername(username);
        User user = (User) userDetails;
        Post post = postService.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        Comment newComment = new Comment(createCommentDto.getText(), user, post);
        Comment savedComment = commentService.save(newComment);
        CommentDto commentDto = new CommentDto(
                savedComment.getId(),
                savedComment.getUser().getId(),
                savedComment.getText(),
                savedComment.getPost().getId()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(commentDto);
    }

}
