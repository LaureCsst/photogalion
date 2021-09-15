package fr.coussout.Photogalion.web;

import java.util.List;

import fr.coussout.Photogalion.dto.MemberDetailDto;
import fr.coussout.Photogalion.dto.MemberFormDto;
import fr.coussout.Photogalion.dto.MemberRecapDto;
import fr.coussout.Photogalion.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/marin")
@CrossOrigin("*")
@Component
public class MemberRestController {
	@Autowired
	private MemberService memberService;

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

	@PostMapping("/add")
	public void addMember(@Valid @RequestBody MemberFormDto memberFormDto) {
		memberService.add(memberFormDto);
	}
}

