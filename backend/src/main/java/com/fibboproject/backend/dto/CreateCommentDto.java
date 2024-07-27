package com.fibboproject.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommentDto {

    @NotBlank(message = "Texto do comentário é obrigatório!")
    private String text;

    public String getText() {
        return text;
    }

}
