package fr.coussout.Photogalion.service;

import fr.coussout.Photogalion.dao.MemberRepository;
import fr.coussout.Photogalion.dto.member.MemberDetailDto;
import fr.coussout.Photogalion.dto.member.MemberFormDto;
import fr.coussout.Photogalion.dto.member.MemberProfilDto;
import fr.coussout.Photogalion.dto.member.MemberRecapDto;
import fr.coussout.Photogalion.entities.Member;
import fr.coussout.Photogalion.mapper.member.IMemberDetailMapper;
import fr.coussout.Photogalion.mapper.member.IMemberFormMapper;
import fr.coussout.Photogalion.mapper.member.IMemberProfilMapper;
import fr.coussout.Photogalion.mapper.member.IMemberRecapMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    @Autowired
    private IMemberProfilMapper memberProfilMapper;

    public List<MemberRecapDto> findAllMembers(){
        List<Member> members= memberRepository.findAll();
        List<MemberRecapDto> memberRecapDtos = new ArrayList<>();
        members.forEach(member -> {
            memberRecapDtos.add(memberRecapMapper.entityToDto(member));
        });
        return memberRecapDtos;
    }

    public MemberProfilDto findById(Long id) {
        Member member = memberRepository.findById(id).get();
        MemberProfilDto memberProfilDto = new MemberProfilDto();
        memberProfilDto= memberProfilMapper.entityToDto(member);
        memberProfilDto.id=member.id;
        return memberProfilDto;
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
        System.out.println(memberForm);
        member.setPseudo(memberForm.pseudo);
       member.setFirstName(memberForm.getFirstName());
       member.setName(memberForm.getName());
       member.setMail(memberForm.getMail());
       member.setBirthday(memberForm.getBirthday());
       member.setColor(memberForm.getColor());
       member.setThumbnail(memberForm.getThumbnail());
       //Validate value and return result
        HashMap<Boolean, String> validation = isValid(member);
        //Iterate on the map, if validation is ok persist member
        //Otherwise return the warning message

        for(Map.Entry<Boolean, String> entry : validation.entrySet()) {
            if(!entry.getKey()) {
                return entry.getValue();
            }
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
        validation.put(true,"Le membre a été ajouté");
        return validation;
    }


}
