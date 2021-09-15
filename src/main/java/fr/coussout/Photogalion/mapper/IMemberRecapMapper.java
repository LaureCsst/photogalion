package fr.coussout.Photogalion.mapper;

import fr.coussout.Photogalion.dto.MemberRecapDto;
import fr.coussout.Photogalion.entities.Member;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface IMemberRecapMapper {
    Member dtoToEntity(MemberRecapDto memberRecapDto);
    MemberRecapDto entityToDto(Member member);
}
