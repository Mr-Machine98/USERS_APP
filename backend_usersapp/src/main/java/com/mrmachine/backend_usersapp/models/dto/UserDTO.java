package com.mrmachine.backend_usersapp.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDTO {
	private Long id;
	private String username;
	private String email;
	private boolean onAdmin;
}
