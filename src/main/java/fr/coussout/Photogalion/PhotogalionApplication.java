package fr.coussout.Photogalion;

import fr.coussout.Photogalion.service.PhotoGalionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class PhotogalionApplication implements CommandLineRunner {
	@Autowired
	private PhotoGalionServiceImpl photogalionInitService;


	public static void main(String[] args) {
		SpringApplication.run(PhotogalionApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		photogalionInitService.initCategory();
		photogalionInitService.initMember();
	}

}
