package fr.coussout.Photogalion.entities;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Category implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4925063262717591391L;
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String name;
	@OneToMany(mappedBy = "category")
	public Collection<PictureCategoryAssociation> pictureCategory;
	

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



	public Category() {
		// TODO Auto-generated constructor stub
	}

}
