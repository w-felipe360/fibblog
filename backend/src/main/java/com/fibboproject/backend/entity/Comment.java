package com.fibboproject.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Optional;

@Entity
@Table(name = "comments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    public Comment(String text, User user, Post post) {
        this.text = text;
        this.user = user;
        this.post = post;
    }

    public Long getId() {
        return id;
    }
    public String getText() {
        return text;
    }
    public User getUser() {
        return user;
    }
    public Post getPost() {
        return post;
    }

    public void setText(String text) {
        this.text = text;
    }
}
