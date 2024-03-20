package com.mrmachine.backend_usersapp.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.mrmachine.backend_usersapp.repositories.UserRepository;

@Service
public class JpaUserDetailsService implements UserDetailsService {
	
	private final UserRepository userRepo;

    JpaUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		/* Recuperamos el usuario envuelto en un Optional */
		Optional<com.mrmachine.backend_usersapp.models.entities.User> 
			currentUser = userRepo.getByUsername(username);
		
		/* Validamos si el usuario si esta' presente */
		if(!currentUser.isPresent()) {
			throw new UsernameNotFoundException(
					String.format("User %s Not Found!", username)
			);
		}
		
		/* Quitamos la envoltura y recuperamos en si el usuario */
		com.mrmachine.backend_usersapp.models.entities.User user
			= currentUser.orElseThrow();
		
		/* Agregamos el rol */
		List<GrantedAuthority> authorities = user
				.getRoles()
				.stream()
				.map(r -> new SimpleGrantedAuthority(r.getName()))
				.collect(Collectors.toList());
				
				
		/* retornamos el User */
		return new User(
				user.getUsername(),
				user.getPassword(),
				true,
				true,
				true,
				true,
				authorities
		);
	}

}
