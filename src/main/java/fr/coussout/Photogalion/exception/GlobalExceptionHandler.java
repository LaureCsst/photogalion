package fr.coussout.Photogalion.exception;

import java.util.HashMap;

import fr.coussout.Photogalion.dto.ResponseDto;
import lombok.Builder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class GlobalExceptionHandler {
	public ResponseDto responseDto;

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> handleMethodArgumentInvalid(MethodArgumentNotValidException exception) {
		HashMap<String, String> errors= new HashMap<>();
		
		exception.getBindingResult().getAllErrors().forEach(error -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage= error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		
		try {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
					ResponseDto.builder()
					.message("Certains champs sont incorrects")
					.success(Boolean.FALSE)
					.data(errors)
					.build()
					);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
