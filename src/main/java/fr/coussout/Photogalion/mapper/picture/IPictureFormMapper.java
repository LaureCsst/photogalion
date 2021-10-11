package fr.coussout.Photogalion.mapper.picture;

import fr.coussout.Photogalion.dto.picture.PictureFormDto;
import fr.coussout.Photogalion.entities.Picture;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IPictureFormMapper {
    Picture dtoToEntity(PictureFormDto pictureFormDto);
    PictureFormDto entityToDto(Picture picture);
}
