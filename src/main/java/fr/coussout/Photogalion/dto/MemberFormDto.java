package fr.coussout.Photogalion.dto;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.File;
import java.util.Date;

public class MemberFormDto {
    public String firstName;
    public String name;
    public String pseudo;
    public String mail;
    public String password;
    public Date birthday;
    public String color;
    public String thumbnail;
}
