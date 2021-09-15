package fr.coussout.Photogalion.entities;

import lombok.Data;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
@Data
public class Event implements Serializable {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String name;
	public Date date;
	@OneToMany(mappedBy = "event")
	public Collection<Picture> pictures;

	public Event() {
		// TODO Auto-generated constructor stub
	}

}
