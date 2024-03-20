package com.mrmachine.backend_usersapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mrmachine.backend_usersapp.models.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	@Query("SELECT r FROM Role r WHERE r.name = :name")
	Optional<Role> findByName(@Param("name") String name);
}
