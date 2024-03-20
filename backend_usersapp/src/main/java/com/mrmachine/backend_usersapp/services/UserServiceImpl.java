package com.mrmachine.backend_usersapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mrmachine.backend_usersapp.models.dto.UserDTO;
import com.mrmachine.backend_usersapp.models.dto.mapper.UserDTOMapper;
import com.mrmachine.backend_usersapp.models.entities.Role;
import com.mrmachine.backend_usersapp.models.entities.User;
import com.mrmachine.backend_usersapp.repositories.RoleRepository;
import com.mrmachine.backend_usersapp.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepo;
	private PasswordEncoder passEncoder;
	private RoleRepository roleRepo;

	UserServiceImpl(UserRepository userRepo, PasswordEncoder passEncoder, RoleRepository roleRepo) {
        this.userRepo = userRepo;
        this.passEncoder = passEncoder;
        this.roleRepo = roleRepo;
    }

	@Override
	public List<UserDTO> findAll() {
		
		List<User> users = this.userRepo.findAll();
		
		return users
				.stream()
				.map( u -> UserDTOMapper
						.builder()
						.setUser(u)
						.build())
				.collect(Collectors.toList());
	}
	
	@Override
	public Page<UserDTO> findAll(Pageable pageable) {
		return this.userRepo
				.findAll(pageable)
				.map( u -> UserDTOMapper.builder().setUser(u).build());
	}

	@Override
	public Optional<UserDTO> findById(Long userId) {
		return this.userRepo
				.findById(userId)
				.map(u -> UserDTOMapper
					.builder()
					.setUser(u)
					.build()
				);
	}

	@Transactional
	@Override
	public void delete(User user) {
		this.userRepo.delete(user);
	}
	
	@Transactional
	@Override
	public void delete(Long id) {
		this.userRepo.deleteById(id);
	}

	@Transactional
	@Override
	public UserDTO save(User user) {
		
		user.setRoles(getRoles(user));
		user.setPassword(this.passEncoder.encode(user.getPassword()));
		
		return UserDTOMapper
				.builder()
				.setUser(this.userRepo.save(user))
				.build();
	}
	
	@Transactional
	@Override
	public UserDTO update(User user) {
		
		Optional<User> userFound = this.userRepo.findById(user.getId());
		User u = null;
		
		if (userFound.isPresent()) {
			
			User userCurrent = userFound.orElseThrow();
			userCurrent.setRoles(getRoles(user));
			userCurrent.setEmail(user.getEmail());
			userCurrent.setUsername(user.getUsername());
			if(!user.getPassword().equals("passwordEmpty")) userCurrent.setPassword( this.passEncoder.encode(user.getPassword()) );
			
			u = this.userRepo.save(userCurrent);
			
		}
		
		return UserDTOMapper
				.builder()
				.setUser(u)
				.build();
	}

	@Override
	public boolean existsById(Long userId) {
		return this.userRepo.existsById(userId);
	}
	
	private List<Role> getRoles(User user) {
		
		List<Role> roles = new ArrayList<>();
		Optional<Role> rolUser = this.roleRepo.findByName("ROLE_USER");
		
		if(rolUser.isPresent()) roles.add(rolUser.orElseThrow());
		
		if (user.isOnAdmin()) {
			Optional<Role> rolAdmin = this.roleRepo.findByName("ROLE_ADMIN");
			if (rolAdmin.isPresent()) roles.add(rolAdmin.orElseThrow());
		}	
		
		return roles;
	}

}
