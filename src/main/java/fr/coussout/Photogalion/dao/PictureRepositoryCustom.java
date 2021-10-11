package fr.coussout.Photogalion.dao;

import fr.coussout.Photogalion.entities.Picture;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PictureRepositoryCustom {

    @Query(value="SELECT p FROM Picture p WHERE p.member_id=:id", nativeQuery = true)
    public List<Picture> findPicturesByUser(@Param("id") Long id);
}
