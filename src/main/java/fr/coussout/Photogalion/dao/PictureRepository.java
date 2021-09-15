package fr.coussout.Photogalion.dao;

import fr.coussout.Photogalion.entities.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {

}
