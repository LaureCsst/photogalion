package fr.coussout.Photogalion.dto;

import lombok.Builder;

@Builder
public class ResponseDto {

	private String message;
	private Object data;
	private Boolean success;
	}


