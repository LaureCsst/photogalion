package fr.coussout.Photogalion.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class PictureCategoryAssociation {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	@ManyToOne
	@JsonProperty(access = Access.WRITE_ONLY)
	public Picture picture;
	@ManyToOne
	@JsonProperty(access = Access.WRITE_ONLY)
	private Category category;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Picture getPicture() {
		return picture;
	}

	public void setPicture(Picture picture) {
		this.picture = picture;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public PictureCategoryAssociation() {
		// TODO Auto-generated constructor stub
	}

}
