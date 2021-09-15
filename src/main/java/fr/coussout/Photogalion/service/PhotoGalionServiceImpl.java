package fr.coussout.Photogalion.service;

import fr.coussout.Photogalion.dao.*;
import fr.coussout.Photogalion.entities.Category;
import fr.coussout.Photogalion.entities.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;


@Service
@Transactional
public class PhotoGalionServiceImpl implements IPhotogalionService{
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private PictureRepository pictureRepository;
	@Autowired
	private StationRepository stationRepository;
	@Autowired
	private CityRepository cityRepository;
	@Autowired
	private EventRepository eventRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private PictureCategoryRepository pictureCategoryRepository;
	@Autowired
	private MemberGalleonRepository memberGalleonRepository;
	

	public PhotoGalionServiceImpl() {
		// TODO Auto-generated constructor stub
	}


	@Override
	public void initMember() {
		AtomicInteger index= new AtomicInteger();
		String[] randomColors= new String[] {"green","blue","red","yellow","brown","black","white","pink","purple"};
		Stream.of("Chloé","Simon","Stephanie","Thomas","Aloïs","Laure","Arthur")
				.forEach(name ->{
						index.incrementAndGet();
						Member member = new Member();
						member.setFirstName(name);
						member.setColor(randomColors[new Random().nextInt(randomColors.length)]);
						member.setPseudo("Marin " + name);
						member.setThumbnail("thumb"+index);
						memberRepository.save(member);
					});
	}


	@Override
	public void initCategory() {
		Stream.of("Sorties entre ami(e)s","Journée Lambda","Noël","Paques","Sortie en famille","Vacances","Anniversaire","Sans Catégorie").forEach(cat ->{
			Category category= new Category();
			category.setName(cat);
			categoryRepository.save(category);
		});
		
	}

}
