package fr.coussout.Photogalion.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Picture implements Serializable {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String name;
	public Date date;
	@ManyToOne
	public Member member;
	@OneToOne
	public Station station;
	@ManyToOne
	public Event event;
	@OneToMany(mappedBy = "picture")
	public Collection<PictureCategoryAssociation> pictureCategory;
	@OneToMany(mappedBy = "picture")
	public Collection<Comment> comments;
	
	
	public Picture() {
		// TODO Auto-generated constructor stub
	}


	public Member getMember() {
		return member;
	}


	public void setMember(Member member) {
		this.member = member;
	}


	public Station getStation() {
		return station;
	}


	public void setStation(Station station) {
		this.station = station;
	}


	public Event getEvent() {
		return event;
	}


	public void setEvent(Event event) {
		this.event = event;
	}


	public Collection<Comment> getComments() {
		return comments;
	}


	public void setComments(Collection<Comment> comments) {
		this.comments = comments;
	}


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


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}

}
