package fr.coussout.Photogalion.web;


import fr.coussout.Photogalion.dto.member.MemberDetailDto;
import fr.coussout.Photogalion.dto.picture.PictureFormDto;
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
    public String addMember(@Valid @RequestBody PictureFormDto[]  pictureFormDto, BindingResult result) throws Exception {
        return pictureService.add(pictureFormDto);
    }

    //Get the picture of an user
    @GetMapping("/{id}")
        public List<PictureFormDto> readPicturesFromUser(@PathVariable("id") Long id) {
        return pictureService.readPicturesFromUser(id);
    }





}
