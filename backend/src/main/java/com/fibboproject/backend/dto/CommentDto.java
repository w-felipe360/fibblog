package com.fibboproject.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {
    private Long id;
    private Long user_id;
    private String user_name;
    private String text;
    private Long post_id;

    public CommentDto(Long id, Long user_id, String user_name, String text, Long post_id) {
        this.id = id;
        this.user_id = user_id;
        this.user_name = user_name;
        this.text = text;
        this.post_id = post_id;
    }
    public Long getId() {
        return id;
    }
}