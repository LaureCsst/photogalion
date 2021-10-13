package fr.coussout.Photogalion.web;

import java.util.List;

import fr.coussout.Photogalion.dto.member.MemberDetailDto;
import fr.coussout.Photogalion.dto.member.MemberFormDto;
import fr.coussout.Photogalion.dto.member.MemberProfilDto;
import fr.coussout.Photogalion.dto.member.MemberRecapDto;
import fr.coussout.Photogalion.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.validation.Valid;


@RestController
@RequestMapping("api/auth/marin")
@CrossOrigin("*")
@Component
public class MemberRestController {
	@Autowired
	private MemberService memberService;
	@Autowired
	ServletContext context;

	@GetMapping("/profil/{id}")
	public MemberProfilDto readMember(@PathVariable("id") Long id) {
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
		return memberService.add(memberFormDto);
	}

	@PutMapping("/update/{id}")
	public String updateMember(@Valid @RequestBody MemberFormDto memberFormDto, BindingResult result, @PathVariable("id") Long id) throws Exception {
		return memberService.update(memberFormDto, id);
	}
}

