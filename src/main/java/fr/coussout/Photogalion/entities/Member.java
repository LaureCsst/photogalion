package fr.coussout.Photogalion.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@CrossOrigin("*")
public class Member implements Serializable {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String firstName;
	public String name;
	public String pseudo;
	public String mail;
	public String password;
	public Date birthday;
	@Lob
	public String thumbnail;
	public String color;
	@OneToMany(mappedBy = "member")
	public Collection<Picture> pictures;
	@OneToMany(mappedBy = "member")
	public Collection<MemberGalleonAssociation> memberGalleon;

	public Collection<MemberGalleonAssociation> getMemberGalleon() {
		return memberGalleon;
	}

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "member_roles",
			joinColumns = @JoinColumn(name = "member_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

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

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Member() {
		// TODO Auto-generated constructor stub
	}

	public Member(String pseudo, String mail, String password, String firstName, String name, String color, String thumbnail, Date birthday) {
		this.pseudo = pseudo;
		this.mail = mail;
		this.password = password;
		this.firstName=firstName;
		this.name=name;
		this.color=color;
		this.thumbnail=thumbnail;
		this.birthday=birthday;
	}

}
