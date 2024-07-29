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
                        comment.getUser().getName(),
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
                savedComment.getUser().getName(),
                savedComment.getText(),
                savedComment.getPost().getId()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(commentDto);
    }
    @GetMapping
    public ResponseEntity<List<CommentDto>> getAllComments() {
        List<Comment> comments = commentService.getAllComments();
        List<CommentDto> commentDtos = comments.stream()
                .map(comment -> new CommentDto(
                        comment.getId(),
                        comment.getUser().getId(),
                        comment.getUser().getName(),
                        comment.getText(),
                        comment.getPost().getId()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(commentDtos);
    }
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDto> updateComment(
            @PathVariable Long commentId,
            @RequestBody @Valid CreateCommentDto updateCommentDto) {
        Comment comment = commentService.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDetails userDetails = userService.loadUserByUsername(username);
        User authenticatedUser = (User) userDetails;
        if (!comment.getUser().equals(authenticatedUser)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Ou qualquer outra resposta de erro apropriada
        }
        comment.setText(updateCommentDto.getText());
        Comment updatedComment = commentService.save(comment);
        CommentDto commentDto = new CommentDto(
                updatedComment.getId(),
                updatedComment.getUser().getId(),
                updatedComment.getUser().getName(),
                updatedComment.getText(),
                updatedComment.getPost().getId()
        );
        return ResponseEntity.ok(commentDto);
    }
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        Comment comment = commentService.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDetails userDetails = userService.loadUserByUsername(username);
        User authenticatedUser = (User) userDetails;

        if (!comment.getUser().equals(authenticatedUser)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        commentService.delete(commentId);
        return ResponseEntity.noContent().build();
    }
}
