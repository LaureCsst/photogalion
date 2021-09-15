package fr.coussout.Photogalion.service;

import fr.coussout.Photogalion.dao.MemberRepository;
import fr.coussout.Photogalion.dto.MemberDetailDto;
import fr.coussout.Photogalion.dto.MemberFormDto;
import fr.coussout.Photogalion.dto.MemberRecapDto;
import fr.coussout.Photogalion.entities.Member;
import fr.coussout.Photogalion.mapper.IMemberDetailMapper;
import fr.coussout.Photogalion.mapper.IMemberFormMapper;
import fr.coussout.Photogalion.mapper.IMemberRecapMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public void add(MemberFormDto memberFormDto) {
        Member member = new Member();
        member=memberFormMapper.dtoToEntity(memberFormDto);
        if(member.getThumbnail()==null){
            member.setThumbnail("thumb0");
        }

        memberRepository.save(member);
    }
}
