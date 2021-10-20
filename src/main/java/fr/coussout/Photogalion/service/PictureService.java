package fr.coussout.Photogalion.service;

import fr.coussout.Photogalion.dao.MemberRepository;
import fr.coussout.Photogalion.dao.PictureRepository;
import fr.coussout.Photogalion.dto.member.MemberFormDto;
import fr.coussout.Photogalion.dto.picture.PictureFormDto;
import fr.coussout.Photogalion.entities.Member;
import fr.coussout.Photogalion.entities.Picture;
import fr.coussout.Photogalion.mapper.picture.IPictureFormMapper;
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

    public String add(PictureFormDto[] pictureFormDto) {
        for (PictureFormDto p:pictureFormDto
             ) {
            Picture picture= new Picture();
            picture=pictureFormMapper.dtoToEntity(p);
            //set the member of the picture;
            Member member=new Member();
            member=memberRepository.getById(p.memberId);
            picture.member=member;
            pictureRepository.save(picture);
        }
        return "La photo a été ajoutée";
    }

    @Transactional
    public List<PictureFormDto>  readPicturesFromUser(Long id){
        List<Picture> pictures=pictureRepository.findPicturesByUser(id);
        List<PictureFormDto> picturesFormDto = new ArrayList<PictureFormDto>();
        for (Picture p: pictures
             ) {
            PictureFormDto pictureFormDto= pictureFormMapper.entityToDto(p);
            pictureFormDto.id= p.id;
            picturesFormDto.add(pictureFormDto);
        };
        return picturesFormDto;
    }

    public void delete(Long id){
        pictureRepository.deleteById(id);
    }

}
