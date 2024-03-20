package com.mrmachine.backend_usersapp.models.dto.mapper;

import com.mrmachine.backend_usersapp.models.dto.UserDTO;
import com.mrmachine.backend_usersapp.models.entities.User;

public class UserDTOMapper {
	
	private User user;
	
	private UserDTOMapper() {}
	
	public static UserDTOMapper builder() {
		return new UserDTOMapper();
	}

	public UserDTOMapper setUser(User user) {
		this.user = user;
		return this;
	}
	
	public UserDTO build() {
		if (this.user == null) throw new RuntimeException("Error, You need to set to entity user variable.");
		
		UserDTO userDto = new UserDTO();
		userDto.setId(this.user.getId());
		userDto.setUsername(this.user.getUsername());
		userDto.setEmail(this.user.getEmail());
		userDto.setOnAdmin( this.user
				.getRoles()
				.stream()
				.anyMatch(r -> "ROLE_ADMIN".equals(r.getName())));
		
		return userDto;
	}
	
	
}
