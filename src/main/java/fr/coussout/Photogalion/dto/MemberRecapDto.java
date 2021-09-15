package fr.coussout.Photogalion.dto;

import lombok.Data;

@Data
public class MemberRecapDto {
    private long id;
    private String pseudo;
    private String thumbnail;
    private String color;
}
