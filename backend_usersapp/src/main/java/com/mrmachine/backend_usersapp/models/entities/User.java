package com.mrmachine.backend_usersapp.models.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "El campo username no debe estar vacio!")
	@Size(min = 4, max = 8, message = "El username debe estar escrito entre 4 y 8 caracteres!")
	@Column(unique = true)
	private String username;
	
	@NotBlank(message = "El campo password no debe estar vacio!")
	private String password;
	
	@NotEmpty(message = "El campo email no debe estar vacio!")
	@Email(message = "Por favor, escriba correctamente el email!")
	@Column(unique = true)
	private String email;
	
	@Transient
	private boolean onAdmin;
	
	@ManyToMany
	@JoinTable(
			name = "users_roles",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id"),
			uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "role_id"})}
	)
	private List<Role> roles;
}
