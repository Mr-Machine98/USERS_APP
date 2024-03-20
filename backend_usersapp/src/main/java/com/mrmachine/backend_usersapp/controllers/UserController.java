package com.mrmachine.backend_usersapp.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mrmachine.backend_usersapp.models.dto.UserDTO;
import com.mrmachine.backend_usersapp.models.entities.User;
import com.mrmachine.backend_usersapp.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> findAll() {
    	List<UserDTO> users = this.userService.findAll();
    	return ResponseEntity.ok(users);
    }
    
    @GetMapping("/page/{page}")
    public ResponseEntity<Page<UserDTO>> findAll(@PathVariable(name = "page") Integer page) {
    	Pageable pageable = PageRequest.of(page, 4);
    	return ResponseEntity.ok(this.userService.findAll(pageable));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable(name = "id") Long id ) {
    	Optional<UserDTO> user = this.userService.findById(id);
    	if (user.isPresent()) return ResponseEntity.ok(user.get());
    	else return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody User user, BindingResult result) {
    	if (result.hasErrors()) return validation(result);
    	else if(user.getId() == null || !this.userService.existsById(user.getId())) return ResponseEntity.status(HttpStatus.CREATED).body(this.userService.save(user));
    	else return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

	@PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody User user, BindingResult result) {
		if (result.hasErrors()) return validation(result);
		else if(user.getId() != null && this.userService.existsById(user.getId())) return ResponseEntity.status(HttpStatus.OK).body(this.userService.update(user));
    	else return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body("User with id " + user.getId() + " not exists, please create user!");
    	// ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(name = "id") Long id ) {
    	Optional<UserDTO> user = this.userService.findById(id);
    	if (user.isPresent()) {
    		this.userService.delete(user.get().getId());
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("User with id " + user.get().getId() + " has been deleted!");
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
    
    private ResponseEntity<?> validation(BindingResult result) {
    	Map<String, String> errors = new HashMap<>();
    	result.getFieldErrors().forEach(err -> {
    		errors.put(err.getField(), err.getDefaultMessage());
    	});
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
	}
    
}
