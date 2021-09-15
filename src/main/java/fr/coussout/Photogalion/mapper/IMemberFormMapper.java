package fr.coussout.Photogalion.mapper;

import fr.coussout.Photogalion.dto.MemberDetailDto;
import fr.coussout.Photogalion.dto.MemberFormDto;
import fr.coussout.Photogalion.entities.Member;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface IMemberFormMapper {

    Member dtoToEntity(MemberFormDto memberFormDto);
    MemberFormDto entityToDto(Member member);
}
