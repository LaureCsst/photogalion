package fr.coussout.Photogalion.service;

import fr.coussout.Photogalion.dao.MemberRepository;
import fr.coussout.Photogalion.dto.MemberDetailDto;
import fr.coussout.Photogalion.dto.MemberFormDto;
import fr.coussout.Photogalion.dto.MemberRecapDto;
import fr.coussout.Photogalion.entities.Member;
import fr.coussout.Photogalion.exception.GlobalExceptionHandler;
import fr.coussout.Photogalion.mapper.IMemberDetailMapper;
import fr.coussout.Photogalion.mapper.IMemberFormMapper;
import fr.coussout.Photogalion.mapper.IMemberRecapMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private IMemberRecapMapper memberRecapMapper;
    @Autowired
    private IMemberDetailMapper memberDetailMapper;
    @Autowired
    private IMemberFormMapper memberFormMapper;

    private GlobalExceptionHandler exceptionHandler;


    public List<MemberRecapDto> findAllMembers(){
        List<Member> members= memberRepository.findAll();
        System.out.println(members);
        List<MemberRecapDto> memberRecapDtos = new ArrayList<>();
        members.forEach(member -> {
            memberRecapDtos.add(memberRecapMapper.entityToDto(member));
        });
        return memberRecapDtos;
    }

    public MemberDetailDto findById(Long id) {
        Member member = memberRepository.findById(id).get();
        MemberDetailDto memberDetailDto = new MemberDetailDto();
        memberDetailDto= memberDetailMapper.entityToDto(member);
        return memberDetailDto;
    }

    public void delete(Long id){
        memberRepository.deleteById(id);
    }


    public ResponseEntity<String> add(MemberFormDto memberFormDto) {

        Member member = new Member();
        member=memberFormMapper.dtoToEntity(memberFormDto);
        System.out.println("1");
        ResponseEntity<String> response= checkValidationConstrainte(member);
        System.out.println("2");
        if(member.getThumbnail()==null){
            member.setThumbnail("thumb0");
        }
        memberRepository.save(member);
        return new ResponseEntity<String>(
                "ok",
                HttpStatus.OK);
    }

    public ResponseEntity<String> checkValidationConstrainte(Object object){
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator=factory.getValidator();

        Set<ConstraintViolation<Object>> constraintViolations =
                validator.validate(object);
        if (constraintViolations.size() > 0 ) {
            for (ConstraintViolation<Object> constraint : constraintViolations) {
                System.out.println("Je veux pas" + constraint.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(constraint.getMessage());
            }
        } else {
            System.out.println("Je veux bien ");
            return new ResponseEntity<String>(
                    "ok",
                    HttpStatus.OK);
        }
        return new ResponseEntity<String>(

                "ok",
                HttpStatus.OK);
    }
}
