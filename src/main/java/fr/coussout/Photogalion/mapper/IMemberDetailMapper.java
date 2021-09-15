package fr.coussout.Photogalion.mapper;

import fr.coussout.Photogalion.dto.MemberDetailDto;
import fr.coussout.Photogalion.entities.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IMemberDetailMapper {
    Member dtoToEntity(MemberDetailDto memberDetailDto);
    MemberDetailDto entityToDto(Member member);
}
