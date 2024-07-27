package com.fibboproject.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePostDto {

    @NotBlank(message = "Título obrigatório!")
    private String title;

    @NotBlank(message = "Descrição obrigatória!")
    private String description;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
