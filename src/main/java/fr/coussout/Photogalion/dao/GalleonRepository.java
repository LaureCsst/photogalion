package fr.coussout.Photogalion.dao;

import fr.coussout.Photogalion.entities.Galleon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleonRepository extends JpaRepository<Galleon, Long> {

}
