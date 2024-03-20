package com.mrmachine.backend_usersapp.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mrmachine.backend_usersapp.models.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	@Query("SELECT u FROM User u WHERE u.username = ?1")
	Optional<User> getByUsername(String username);
	
	Page<User> findAll(Pageable pageable);
		
}
