package fr.coussout.Photogalion.exception;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import fr.coussout.Photogalion.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

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

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationExceptions(
			MethodArgumentNotValidException ex) {
		System.out.println("Je passe la");
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		return errors;
	}


}
