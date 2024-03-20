package com.mrmachine.backend_usersapp.auth;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.mrmachine.backend_usersapp.auth.filters.JwtAuthenticationFilter;
import com.mrmachine.backend_usersapp.auth.filters.JwtValidationFilter;

@Configuration
public class SpringSecurityConfig {
	
	/*
	 * 1. Primero Construir el filtro de auntenticacion
	 * 
	 * 2. agregar el filtro nuestro de auth
	 * 
	 * 3, implementar el jpaUserDetailsService sirve para consultar en la bd 
	 * 		y hacer match con el usuario proporcionado se crea una clase en el service, y retornar el
	 * 		token
	 * 
	 * 3. crear segundo filtro para validar el token para consumir los servicios de la api
	 * 
	 * 4. agregar los cors con el metodo corsConfigurationSource() linea 94.
	 * */
	
	private final AuthenticationConfiguration authenticationConfiguration;

    SpringSecurityConfig(AuthenticationConfiguration authenticationConfiguration) {
        this.authenticationConfiguration = authenticationConfiguration;
    }
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
				.authorizeHttpRequests( (authorizeHttpRequest) -> 
					/*
					 * Aqui establecemos quien puede y quien no acceder
					 * a los recursos del API
					 * */
					authorizeHttpRequest
						.requestMatchers(HttpMethod.GET, "/api/users/all" , "/api/users/page/{page}" )
							.permitAll()
						.requestMatchers(HttpMethod.GET, "/api/users/{id}" )
							.hasAnyRole("ADMIN", "USER")
						.requestMatchers(HttpMethod.POST, "/api/users" )
							.hasRole("ADMIN")
						.requestMatchers("/api/users/**")
							.hasRole("ADMIN")
						.anyRequest()
						.authenticated()
				)
				// 2. Agregamos nuestro filtro de seguridad para authenticar e incorporamos el authenticationConfiguration
				.addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()))
				// 3. Agregamos segundo filtro para validar el token para consumir los servicios de la api
				.addFilter(new JwtValidationFilter(authenticationConfiguration.getAuthenticationManager()))
				.csrf( csrf -> csrf.disable() ) 
				.sessionManagement( management -> {
					/*
					 * los datos cuando se inicia session se guardan 
					 * en sessionManagment, debemos quitar la session de 
					 * http, porque se manejara por tokens, la session la
					 *  manejara el frontend.
					 * */
					management.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
				})
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.build();
	}
	
	@Bean
	AuthenticationManager authenticationManager() throws Exception {
		return this.authenticationConfiguration.getAuthenticationManager();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
		config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
		config.setAllowCredentials(true);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		
		return source;
	}
	
	@Bean
	FilterRegistrationBean<CorsFilter> corsFilter() {
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(new CorsFilter(corsConfigurationSource()));
		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
		return bean;
	}
}
