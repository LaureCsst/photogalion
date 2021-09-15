package fr.coussout.Photogalion.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Comment implements Serializable{

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String content;
	public Date date;
	@OneToOne
	public Member member;
	@OneToOne
	public Picture picture;
	

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}


	public Member getMember() {
		return member;
	}


	public void setMember(Member member) {
		this.member = member;
	}


	public Picture getPicture() {
		return picture;
	}


	public void setPicture(Picture picture) {
		this.picture = picture;
	}


	public Comment() {
		// TODO Auto-generated constructor stub
	}

}
