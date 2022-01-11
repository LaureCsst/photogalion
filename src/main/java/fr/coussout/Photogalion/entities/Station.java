package fr.coussout.Photogalion.entities;

import org.geolatte.geom.crs.*;
import org.hibernate.annotations.Type;
import org.locationtech.jts.geom.*;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.*;

@Entity
@Component
public class Station implements Serializable {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public Double lattitude;
	public Double longitude;

	@Column(columnDefinition = "geometry")
	public Geometry geom;
	public String name;

	public Geometry getGeom() {
		return geom;
	}

	public void setGeom(Double lattitude, Double longitude) {
		geom = GeometryUtil.parseLocation(longitude,lattitude);
		this.geom = geom;
	}

	@OneToMany(mappedBy = "station")
	public Collection<Picture> pictures;
	@ManyToOne
	public City city;

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public Station() {
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getLattitude() {
		return lattitude;
	}

	public void setLattitude(Double lattitude) {
		this.lattitude = lattitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Collection<Picture> getPictures() {
		return pictures;
	}

	public void setPictures(Collection<Picture> pictures) {
		this.pictures = pictures;
	}

}
