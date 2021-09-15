package fr.coussout.Photogalion.dto;

import fr.coussout.Photogalion.entities.MemberGalleonAssociation;
import fr.coussout.Photogalion.entities.Picture;
import lombok.Data;
import java.util.Collection;
import java.util.Date;

@Data
public class MemberDetailDto {
    public long id;
    public String firstName;
    public String name;
    public String pseudo;
    public String mail;
    public String password;
    public Date birthday;
    public String thumbnail;
    public String color;
    public Collection<Picture> pictures;
    public Collection<MemberGalleonAssociation> memberGalleon;
}
