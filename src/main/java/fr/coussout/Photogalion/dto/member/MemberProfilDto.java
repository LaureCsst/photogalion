package fr.coussout.Photogalion.dto.member;

import lombok.Data;

import java.util.Date;

@Data
public class MemberProfilDto {
    public long id;
    public String firstName;
    public String name;
    public String pseudo;
    public String mail;
    public Date birthday;
    public String thumbnail;
    public String color;

}
