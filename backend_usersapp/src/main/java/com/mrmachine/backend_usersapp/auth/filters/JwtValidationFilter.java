package com.mrmachine.backend_usersapp.auth.filters;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mrmachine.backend_usersapp.auth.SimpleGrantedAuthorityJsonCreator;
import com.mrmachine.backend_usersapp.auth.TokenJwtConfig;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtValidationFilter extends BasicAuthenticationFilter {

	public JwtValidationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}
	
	/*
	 * Function that valid our Token
	 * */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException { // Metodo que recibe el token si es valido

		String header = request.getHeader(TokenJwtConfig.HEADER);
		// validar si esta cabecera contiene la palabra bearer 
		if(header == null || !header.startsWith(TokenJwtConfig.PREFIX_TOKEN)) {
			chain.doFilter(request, response);
			return;
		}
		
		String token = header.replace(TokenJwtConfig.PREFIX_TOKEN, "");
		
		try {
			/* validated our token where it comes in header variable  */
			Jws<Claims> claims = Jwts.parser()
				.verifyWith(TokenJwtConfig.SECRET_KEY)
				.build()
				.parseSignedClaims(token);
			
			/* get Username */
			String username = claims.getPayload().getSubject();
			/* get roles */
			Object authoritiesClaims = claims.getPayload().get("authorities");
			Collection<? extends GrantedAuthority> authorities = Arrays
					.asList( new ObjectMapper()
						/* 
						 * SimpleGrantedAuthorityJsonCreator ayuda a introducir
						 * el authority a la clase SimpleGrantedAuthority
						 * mira la clase SimpleGrantedAuthorityJsonCreator para entender.
						 * porque la clase SimpleGrantedAuthority no tiene metodo set para colocar
						 * el authority
						 *  */
						.addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthorityJsonCreator.class)
						.readValue(authoritiesClaims.toString().getBytes(), SimpleGrantedAuthority[].class) 
					);
			
			var authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
			// Aqui nos autenticamos
			SecurityContextHolder.getContext().setAuthentication(authentication);
			chain.doFilter(request, response);
			
		} catch (JwtException e) {
			// Json para indicar que la autenticacion fue nula
			Map<String, Object> body = new HashMap<>();
			body.put("message", "invalid token");
			body.put("error", e.getMessage());
			response.getWriter().write(new ObjectMapper().writeValueAsString(body));
			response.setStatus(401);
			response.setContentType("application/json");
		}
	}

}
