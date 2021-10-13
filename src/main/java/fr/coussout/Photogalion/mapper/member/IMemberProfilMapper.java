package fr.coussout.Photogalion.mapper.member;

import fr.coussout.Photogalion.dto.member.MemberDetailDto;
import fr.coussout.Photogalion.dto.member.MemberProfilDto;
import fr.coussout.Photogalion.entities.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IMemberProfilMapper {
    Member dtoToEntity(MemberProfilDto memberProfilDto);
    MemberProfilDto entityToDto(Member member);
}
