package fr.coussout.Photogalion.web;

import java.io.File;
import java.util.List;

import fr.coussout.Photogalion.dto.MemberDetailDto;
import fr.coussout.Photogalion.dto.MemberFormDto;
import fr.coussout.Photogalion.dto.MemberFormDtoFile;
import fr.coussout.Photogalion.dto.MemberRecapDto;
import fr.coussout.Photogalion.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;


@RestController
@RequestMapping("/marin")
@CrossOrigin("*")
@Component
public class MemberRestController {
	@Autowired
	private MemberService memberService;
	@Autowired
	ServletContext context;

	@GetMapping("/profil/{id}")
	public MemberDetailDto readMember(@PathVariable("id") Long id) {
		return memberService.findById(id);
	}

	@GetMapping("/all-recap")
	public List<MemberRecapDto> findAllMembers() {
		return memberService.findAllMembers();

	}

	@GetMapping("/delete/{id}")
	public void deleteMember(@PathVariable("id") Long id) {
		memberService.delete(id);
	}

	@PostMapping(value = "/add")
	public String addMember(@Valid @RequestBody MemberFormDto memberFormDto, BindingResult result) throws Exception {
		System.out.println("Salut");
		return memberService.add(memberFormDto);
	}

	@PutMapping("/update/{id}")
	public String updateMember(@Valid @RequestBody MemberFormDto memberFormDto, BindingResult result, @PathVariable("id") Long id) throws Exception {
		System.out.println("Bonjour");
		return memberService.update(memberFormDto, id);
	}
}

