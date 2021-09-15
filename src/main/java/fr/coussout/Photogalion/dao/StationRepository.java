package fr.coussout.Photogalion.dao;

import fr.coussout.Photogalion.entities.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {

}
