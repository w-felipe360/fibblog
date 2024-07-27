package com.fibboproject.backend.service;

import com.fibboproject.backend.entity.Post;
import com.fibboproject.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post savePost(Post post) {
        return postRepository.save(post);
    }
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
    public Optional<Post> findById(Long id) {
        return postRepository.findById(id);
    }
    public Post updatePost(Long postId, String title, String description) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        post.setTitle(title);
        post.setDescription(description);

        return postRepository.save(post);
    }
    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        postRepository.delete(post);
    }
}
