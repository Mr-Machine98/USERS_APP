package com.mrmachine.backend_usersapp.auth.filters;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mrmachine.backend_usersapp.auth.TokenJwtConfig;
import com.mrmachine.backend_usersapp.models.entities.User;

import io.jsonwebtoken.ClaimsBuilder;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	
	/**
	 * 1.
	 * Este filtro por defecto tiene una ruta incorporada -> /login
	 * siempre que se consulte por http /login se ejecuta este filtro,
	 * siempre y cuando la peticion sea POST. es como un controllador
	 * 
	 * */
	
	private AuthenticationManager authenticationManager;

	public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		User user = null;
		String username = null;
		String password = null;
		
		try {
			// Recuperamos los datos del usuario desde el req del http, lo mapeamos y creamos un User
			user = new ObjectMapper().readValue(request.getInputStream(), User.class);
			username = user.getUsername();
			password = user.getPassword();
		} catch (StreamReadException e) {
			e.printStackTrace();
		} catch (DatabindException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		// Nos autenticamos
		var authToken = new UsernamePasswordAuthenticationToken(username, password);
		
		/*
		 * Aqui busca el JpaUserDetailsService y valida si el usuario es valido y autentico
		 * */
		return this.authenticationManager.authenticate(authToken);
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		// Cuando la autenticacion es correcta se activa este metodo
		// recuperamos el username
		String username =  ((org.springframework.security.core.userdetails.User) 
				authResult
				.getPrincipal())
				.getUsername();
		
		Collection<? extends GrantedAuthority> roles = authResult.getAuthorities();
		boolean isAdmin = roles.stream().anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
		// los claims son data que enviamos en el token
		ClaimsBuilder claims = Jwts.claims();
		claims.add("authorities", new ObjectMapper().writeValueAsString(roles));
		claims.add("isAdmin", isAdmin);
		claims.add("username", username);
		
		
		// Creamos el token
		String token = Jwts
				.builder()
				.claims((Map<String, ?>) claims)
				.subject(username)
				.signWith(TokenJwtConfig.SECRET_KEY)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + 3600000))
				.compact();
		
		// agregamos la cabecera Authorization con el bearer y el token
		response.addHeader(TokenJwtConfig.HEADER, TokenJwtConfig.HEADER + token);
		
		// Creamos el JSON con el toquen usuario y un mensaje
		Map<String, Object> body = new HashMap<>();
		body.put("token", token);
		body.put("message", String.format("Hi %s, you did login ", username));
		body.put("username", username);
		
		// Devolvemos todo con lo necesario en el response
		response.getWriter().write(new ObjectMapper().writeValueAsString(body));
		response.setStatus(200);
		response.setContentType("application/json");
	}
	
	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		// Metodo si la authenticacion fue erronea
		// Json para indicar que la autenticacion fue nula
		Map<String, Object> body = new HashMap<>();
		body.put("message", "Error, username or password incorrect!");
		body.put("error", failed.getMessage());
		
		response.getWriter().write(new ObjectMapper().writeValueAsString(body));
		response.setStatus(401);
		response.setContentType("application/json");
	}
}
