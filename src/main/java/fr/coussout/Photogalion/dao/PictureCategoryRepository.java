package fr.coussout.Photogalion.dao;

import fr.coussout.Photogalion.entities.PictureCategoryAssociation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PictureCategoryRepository extends JpaRepository<PictureCategoryAssociation, Long> {

}
