package com.fibboproject.backend.service;

import com.fibboproject.backend.entity.Comment;
import com.fibboproject.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }
    public Optional<Comment> findById(Long commentId) {
        return commentRepository.findById(commentId);
    }
    public void delete(Long commentId) {
        commentRepository.deleteById(commentId);
    }
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }
}
