package fr.coussout.Photogalion.mapper.member;

import fr.coussout.Photogalion.dto.member.MemberRecapDto;
import fr.coussout.Photogalion.entities.Member;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface IMemberRecapMapper {
    Member dtoToEntity(MemberRecapDto memberRecapDto);
    MemberRecapDto entityToDto(Member member);
}
