package fr.coussout.Photogalion.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.RequiredTypes;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@CrossOrigin("*")
public class Member implements Serializable {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String firstName;
	public String name;
	@NotNull(message = "Vous devez renseigner votre pseudo")
	public String pseudo;
	@Email(message = "Votre courriel n'est pas valide")
	@Column(unique = true)
	@NotNull(message = "Vous devez renseigner votre e-mail")
	public String mail;
	@NotNull(message = "Vous devez renseigner votre mot de passe")
	public String password;
	public Date birthday;
	public String thumbnail;
	public String color;
	@OneToMany(mappedBy = "member")
	public Collection<Picture> pictures;
	@OneToMany(mappedBy = "member")
	public Collection<MemberGalleonAssociation> memberGalleon;

	public Collection<MemberGalleonAssociation> getMemberGalleon() {
		return memberGalleon;
	}

	public void setMemberGalleon(Collection<MemberGalleonAssociation> memberGalleon) {
		this.memberGalleon = memberGalleon;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPseudo() {
		return pseudo;
	}

	public void setPseudo(String pseudo) {
		this.pseudo = pseudo;
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

	public Collection<Picture> getPictures() {
		return pictures;
	}

	public void setPictures(Collection<Picture> pictures) {
		this.pictures = pictures;
	}

	
	public Member() {
		// TODO Auto-generated constructor stub
	}

}
