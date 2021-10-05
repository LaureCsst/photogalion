package fr.coussout.Photogalion.web;

import fr.coussout.Photogalion.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/photo")
@CrossOrigin("*")
@Component
public class PictureRestController {

}
