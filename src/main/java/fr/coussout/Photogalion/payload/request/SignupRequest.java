package fr.coussout.Photogalion.payload.request;

import java.util.Date;
import java.util.Set;

import javax.persistence.Lob;
import javax.validation.constraints.*;

public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String membername;

    @NotBlank
    @Size(max = 50)
    @Email
    private String mail;

    private Set<String> role;
    public String firstName;
    public String name;
    public Date birthday;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Lob
    public String thumbnail;
    public String color;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;


    public String getMembername() {
        return membername;
    }

    public void setMembername(String membername) {
        this.membername = membername;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRole() {
        return this.role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }
}