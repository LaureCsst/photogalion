package fr.coussout.Photogalion.web;


import fr.coussout.Photogalion.dto.picture.PictureFormDto;
import fr.coussout.Photogalion.dto.station.StationFormDto;
import fr.coussout.Photogalion.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/auth/station")
@CrossOrigin("*")
@Component
public class StationRestController {
    @Autowired
    private StationService stationService;

    @PostMapping(value = "/add")
    public String addMember(@Valid @RequestBody StationFormDto stationFormDto, BindingResult result) throws Exception {
        return stationService.add(stationFormDto);
    }
}
