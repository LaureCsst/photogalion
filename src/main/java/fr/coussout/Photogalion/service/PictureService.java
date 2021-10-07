package fr.coussout.Photogalion.service;

import fr.coussout.Photogalion.dao.PictureRepository;
import fr.coussout.Photogalion.dto.member.MemberFormDto;
import fr.coussout.Photogalion.dto.picture.PictureFormDto;
import fr.coussout.Photogalion.entities.Picture;
import fr.coussout.Photogalion.mapper.picture.IPictureFormMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PictureService {
    @Autowired
    private PictureRepository pictureRepository;
    @Autowired
    private IPictureFormMapper pictureFormMapper;

    public String add(PictureFormDto pictureFormDto) {

        Picture picture= new Picture();

        picture=pictureFormMapper.dtoToEntity(pictureFormDto);

        pictureRepository.save(picture);
        return "La photo a été ajoutée";
    }
}
