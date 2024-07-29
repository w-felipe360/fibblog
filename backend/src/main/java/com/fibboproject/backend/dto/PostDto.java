package com.fibboproject.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDto {

    private Long id;
    private Long user_id;
    private String title;
    private String description;

    public PostDto(Long id, String title, String description, Long userId) {
        this.id = id;
        this.user_id = userId;
        this.title = title;
        this.description = description;
    }
    public Long getId() {
        return id;
    }
}
