package fr.coussout.Photogalion.service;

import fr.coussout.Photogalion.dao.MemberRepository;
import fr.coussout.Photogalion.dao.PictureRepository;
import fr.coussout.Photogalion.dao.StationRepository;
import fr.coussout.Photogalion.dto.member.MemberFormDto;
import fr.coussout.Photogalion.dto.picture.PictureFormDto;
import fr.coussout.Photogalion.dto.station.StationFormDto;
import fr.coussout.Photogalion.entities.Member;
import fr.coussout.Photogalion.entities.Picture;
import fr.coussout.Photogalion.entities.Station;
import fr.coussout.Photogalion.mapper.picture.IPictureFormMapper;
import fr.coussout.Photogalion.mapper.station.IStationFormMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PictureService {
    @Autowired
    private PictureRepository pictureRepository;
    @Autowired
    private IPictureFormMapper pictureFormMapper;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private IStationFormMapper stationFormMapper;
    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private StationService stationService;

    @Autowired
    private Picture picture;
    @Autowired
    private Member member;

    public String add(PictureFormDto[] pictureFormDto) {
        //Creation station - LongLat
        Station station= new Station();
        station.setLattitude(pictureFormDto[0].getStations()[0]);
        station.setLongitude(pictureFormDto[0].getStations()[1]);
        //Création de la variable geom interprétable par geoserver
        station.setGeom(station.getLattitude(), station.getLongitude());
        stationRepository.save(station);
        Long stationId=station.getId();
        for (PictureFormDto p:pictureFormDto
             ) {
            picture=pictureFormMapper.dtoToEntity(p);
            //set the station of the picture
            picture.setStation(station);
            //set the member of the picture
            member=memberRepository.getById(p.memberId);
            picture.member=member;
           // picture.station=station;
            pictureRepository.save(picture);
        }
        return "La photo a été ajoutée";
    }

    @Transactional
    public List<PictureFormDto>  readPicturesFromUser(Long id){
        List<Picture> pictures=pictureRepository.findPicturesByUser(id);
        List<PictureFormDto> picturesFormDto = new ArrayList<>();
        for (Picture p: pictures
             ) {
            PictureFormDto pictureFormDto= pictureFormMapper.entityToDto(p);
            pictureFormDto.id= p.id;
            picturesFormDto.add(pictureFormDto);
        };
        return picturesFormDto;
    }

    @Transactional
    public List<PictureFormDto>  readPicturesFromStation(Long id){
        List<Picture> pictures=pictureRepository.findPicturesByStation(id);
        List<PictureFormDto> picturesFormDto = new ArrayList<PictureFormDto>();
        for (Picture p: pictures
        ) {
            PictureFormDto pictureFormDto= pictureFormMapper.entityToDto(p);
            pictureFormDto.id= p.id;
            picturesFormDto.add(pictureFormDto);
        };
        return picturesFormDto;
    }
    @Transactional
    public PictureFormDto  readLastPicturesFromStation(Long id){
        Picture picture=pictureRepository.findLastPicturesByStation(id);

            PictureFormDto pictureFormDto= pictureFormMapper.entityToDto(picture);


        return pictureFormDto;
    }
    public void delete(Long id){
        pictureRepository.deleteById(id);
    }

}
