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
import org.aspectj.bridge.IMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.*;

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


    public String add(MemberFormDto memberFormDto) {

        Member member = new Member();
        member=memberFormMapper.dtoToEntity(memberFormDto);

        HashMap<Boolean, String> validation = isValid(member);
        //Iterate on the map, if validation is ok persist member
        //Otherwise return the warning message
        for(Map.Entry<Boolean, String> entry : validation.entrySet()) {
            if(!entry.getKey()) {
                return entry.getValue();
            }

        }
        if(member.getThumbnail()==null){
            member.setThumbnail("thumb0");
        }
        memberRepository.save(member);
        return "Le membre a été ajouté";
    }

    public String update(MemberFormDto memberFormDto, Long id){
       Member member= memberRepository.findById(id).get();
       Member memberForm=memberFormMapper.dtoToEntity(memberFormDto);
       //Add new value from Form
       member.setFirstName(memberForm.getFirstName());
       member.setName(memberForm.getName());
       member.setPseudo(memberForm.getPseudo());
       member.setMail(memberForm.getMail());
       member.setPassword(memberForm.getPassword());
       member.setBirthday(memberForm.getBirthday());
       member.setColor(memberForm.getColor());
       //Validate value and return result
        HashMap<Boolean, String> validation = isValid(member);
        //Iterate on the map, if validation is ok persist member
        //Otherwise return the warning message
        for(Map.Entry<Boolean, String> entry : validation.entrySet()) {
            if(!entry.getKey()) {
                return entry.getValue();
            }

        }
        if(member.getThumbnail()==null){
            member.setThumbnail("thumb0");
        }
        memberRepository.save(member);
        return "Le membre a été ajouté";

    }

    //check enter field of the form
    public HashMap<Boolean, String> isValid(Member member){
        HashMap<Boolean, String> validation = new HashMap<>();

        if(member.getPseudo()== null){
            validation.put(false,"Veuillez entrer un pseudo");
            return validation;
        }
        if (member.getMail()== null){
            validation.put(false,"Veuillez entrer un email");
            return validation;
        }
        if (member.getPassword()== null){
            validation.put(false,"Veuillez entrer un mot de passe");
            return validation;
        }
        validation.put(true,"Le membre a été ajouté");
        return validation;
    }


}
