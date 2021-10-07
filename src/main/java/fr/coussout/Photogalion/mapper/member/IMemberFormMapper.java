package fr.coussout.Photogalion.mapper.member;

import fr.coussout.Photogalion.dto.member.MemberFormDto;
import fr.coussout.Photogalion.entities.Member;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface IMemberFormMapper {

    Member dtoToEntity(MemberFormDto memberFormDto);
    MemberFormDto entityToDto(Member member);
}
