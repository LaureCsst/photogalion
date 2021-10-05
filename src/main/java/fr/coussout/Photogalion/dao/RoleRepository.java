package fr.coussout.Photogalion.dao;

import java.util.Optional;

import fr.coussout.Photogalion.entities.ERole;
import fr.coussout.Photogalion.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}