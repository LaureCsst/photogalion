package fr.coussout.Photogalion.dao;
import fr.coussout.Photogalion.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByPseudo(String pseudo);

    Boolean existsByPseudo(String pseudo);

    Boolean existsByMail(String mail);
}
