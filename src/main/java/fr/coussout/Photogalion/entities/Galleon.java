package fr.coussout.Photogalion.entities;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Galleon {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String name;
	@OneToMany(mappedBy = "galleon")
	public Collection<MemberGalleonAssociation> memberGalleon;
	

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public Collection<MemberGalleonAssociation> getMemberGalleon() {
		return memberGalleon;
	}


	public void setMemberGalleon(Collection<MemberGalleonAssociation> memberGalleon) {
		this.memberGalleon = memberGalleon;
	}


	public Galleon() {
		// TODO Auto-generated constructor stub
	}

}
