package fr.coussout.Photogalion.web;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import fr.coussout.Photogalion.dao.MemberRepository;
import fr.coussout.Photogalion.dao.RoleRepository;
import fr.coussout.Photogalion.entities.ERole;
import fr.coussout.Photogalion.entities.Member;
import fr.coussout.Photogalion.entities.Role;
import fr.coussout.Photogalion.payload.request.LoginRequest;
import fr.coussout.Photogalion.payload.request.SignupRequest;
import fr.coussout.Photogalion.payload.response.JwtResponse;
import fr.coussout.Photogalion.payload.response.MessageResponse;
import fr.coussout.Photogalion.security.jwt.JwtUtils;
import fr.coussout.Photogalion.security.services.MemberDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateMember(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getMembername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        MemberDetailsImpl memberDetails = (MemberDetailsImpl) authentication.getPrincipal();
        List<String> roles = memberDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                memberDetails.getId(),
                memberDetails.getUsername(),
                memberDetails.getMail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerMember(@Valid @RequestBody SignupRequest signUpRequest) {

        if (memberRepository.existsByPseudo(signUpRequest.getMembername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Erreur: Ce nom est déjà utilisé"));
        }

        if (memberRepository.existsByMail(signUpRequest.getMail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new Member's account
        Member member = new Member(signUpRequest.getMembername(),
                signUpRequest.getMail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstName(),
                signUpRequest.getName(),
                signUpRequest.getColor(),
                signUpRequest.getThumbnail(),
                signUpRequest.getBirthday()
                    );

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role memberRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(memberRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role memberRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(memberRole);
                }
            });
        }

        member.setRoles(roles);
        memberRepository.save(member);

        return ResponseEntity.ok(new MessageResponse("Le membre a bien été enregistré!"));
    }
}