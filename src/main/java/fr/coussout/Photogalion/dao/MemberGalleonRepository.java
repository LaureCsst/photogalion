package fr.coussout.Photogalion.dao;

import fr.coussout.Photogalion.entities.MemberGalleonAssociation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberGalleonRepository extends JpaRepository<MemberGalleonAssociation, Long> {

}
