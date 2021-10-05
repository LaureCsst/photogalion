package fr.coussout.Photogalion.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import fr.coussout.Photogalion.entities.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class MemberDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String membername;

    private String mail;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public MemberDetailsImpl(Long id, String membername, String mail, String password,
                           Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.membername = membername;
        this.mail = mail;
        this.password = password;
        this.authorities = authorities;
    }


    public static MemberDetailsImpl build(Member member) {
        List<GrantedAuthority> authorities = member.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new MemberDetailsImpl(
                member.getId(),
                member.getPseudo(),
                member.getMail(),
                member.getPassword(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getId() {
        return id;
    }

    public String getMail() {
        return mail;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        MemberDetailsImpl member = (MemberDetailsImpl) o;
        return Objects.equals(id, member.id);
    }
}