package com.fibboproject.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDto {

    private Long id;
    private String title;
    private String description;
    private Long userId;

    public PostDto(Long id, String title, String description, Long userId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.userId = userId;
    }
    public Long getId() {
        return id;
    }
}
