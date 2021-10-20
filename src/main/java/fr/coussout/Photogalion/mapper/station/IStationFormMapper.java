package fr.coussout.Photogalion.mapper.station;

import fr.coussout.Photogalion.dto.picture.PictureFormDto;
import fr.coussout.Photogalion.dto.station.StationFormDto;
import fr.coussout.Photogalion.entities.Picture;
import fr.coussout.Photogalion.entities.Station;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IStationFormMapper {
    Station dtoToEntity(StationFormDto stationFormDto);
    StationFormDto entityToDto(Station station);
}
