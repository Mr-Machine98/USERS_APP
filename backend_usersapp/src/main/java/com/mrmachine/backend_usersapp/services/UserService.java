package com.mrmachine.backend_usersapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mrmachine.backend_usersapp.models.dto.UserDTO;
import com.mrmachine.backend_usersapp.models.entities.User;

public interface UserService {
	List<UserDTO> findAll();
	Optional<UserDTO> findById(Long userId);
	void delete(User user);
	void delete(Long id);
	UserDTO save(User user);
	UserDTO update(User user);
	boolean existsById(Long id);
	Page<UserDTO> findAll(Pageable pageable);
}
