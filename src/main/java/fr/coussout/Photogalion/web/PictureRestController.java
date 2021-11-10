package fr.coussout.Photogalion.web;


import fr.coussout.Photogalion.dto.member.MemberDetailDto;
import fr.coussout.Photogalion.dto.picture.PictureFormDto;
import fr.coussout.Photogalion.dto.station.StationFormDto;
import fr.coussout.Photogalion.service.PictureService;
import org.hibernate.validator.constraints.pl.NIP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/auth/photo")
@CrossOrigin("*")
@Component
public class PictureRestController {
    @Autowired
    private PictureService pictureService;

    @PostMapping(value = "/add")
    public String addPicture(@Valid @RequestBody PictureFormDto[]  pictureFormDto, BindingResult result) throws Exception {
        return pictureService.add(pictureFormDto);
    }


    //Get the picture of an user
    @GetMapping("/member/{id}")
        public List<PictureFormDto> readPicturesFromUser(@PathVariable("id") Long id) {
        return pictureService.readPicturesFromUser(id);
    }
    //Get the pictures of a station
    @GetMapping("/station/{id}")
    public List<PictureFormDto> readPicturesFromStation(@PathVariable("id") Long id) {
        return pictureService.readPicturesFromStation(id);
    }


    //Get the last pictures of a station
    @GetMapping("/station/last/{id}")
    public PictureFormDto readLastPicturesFromStation(@PathVariable("id") Long id) {
        return pictureService.readLastPicturesFromStation(id);
    }

    @GetMapping("/delete/{id}")
    public void deletePicture(@PathVariable("id") Long id) {
        pictureService.delete(id);
    }

}
