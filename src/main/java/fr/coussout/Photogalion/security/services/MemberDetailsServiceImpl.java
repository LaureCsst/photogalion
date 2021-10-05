package fr.coussout.Photogalion.security.services;


import fr.coussout.Photogalion.dao.MemberRepository;
import fr.coussout.Photogalion.entities.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberDetailsServiceImpl implements UserDetailsService {
    @Autowired
    MemberRepository memberRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String membername) throws UsernameNotFoundException {
        Member member = memberRepository.findByPseudo(membername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + membername));

        return MemberDetailsImpl.build(member);
    }

}