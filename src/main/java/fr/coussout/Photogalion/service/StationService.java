package fr.coussout.Photogalion.service;

import fr.coussout.Photogalion.dao.StationRepository;
import fr.coussout.Photogalion.dto.picture.PictureFormDto;
import fr.coussout.Photogalion.dto.station.StationFormDto;
import fr.coussout.Photogalion.entities.Member;
import fr.coussout.Photogalion.entities.Picture;
import fr.coussout.Photogalion.entities.Station;
import fr.coussout.Photogalion.mapper.station.IStationFormMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StationService {
    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private IStationFormMapper stationFormMapper;

    public String add(StationFormDto stationFormDto) {

            Station station= new Station();
        station=stationFormMapper.dtoToEntity(stationFormDto);

        stationRepository.save(station);

        return "La station a été ajoutée";
    }

}
