package fr.coussout.Photogalion.entities;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class City implements Serializable{

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String name;
	public Integer postalCode;
	@OneToMany(mappedBy = "city")
	public Collection<Station> stations;
	
	
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


	public Integer getPostalCode() {
		return postalCode;
	}


	public void setPostalCode(Integer postalCode) {
		this.postalCode = postalCode;
	}


	public Collection<Station> getStations() {
		return stations;
	}


	public void setStations(Collection<Station> stations) {
		this.stations = stations;
	}


	public City() {
		// TODO Auto-generated constructor stub
	}

}
