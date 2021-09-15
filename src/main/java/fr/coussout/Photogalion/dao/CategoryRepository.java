package fr.coussout.Photogalion.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.coussout.Photogalion.entities.Category;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
