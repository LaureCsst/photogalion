package fr.coussout.Photogalion.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class MemberGalleonAssociation {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	@ManyToOne
	@JsonProperty(access = Access.WRITE_ONLY)
	public Member member;
	@ManyToOne
	@JsonProperty(access = Access.WRITE_ONLY)
	private Galleon galleon;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Member getMember() {
		return member;
	}
	public void setMember(Member member) {
		this.member = member;
	}
	public Galleon getGalleon() {
		return galleon;
	}
	public void setGalleon(Galleon galleon) {
		this.galleon = galleon;
	}
	public MemberGalleonAssociation() {
		// TODO Auto-generated constructor stub
	}

}
