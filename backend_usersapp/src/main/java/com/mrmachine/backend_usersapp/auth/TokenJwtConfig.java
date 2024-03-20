package com.mrmachine.backend_usersapp.auth;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;

public class TokenJwtConfig {
	//public static final String SECRET_KEY = "algun_token_con_alguna_frase_secreta.";
	public static final SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();
	public static final String PREFIX_TOKEN = "Bearer ";
	public static final String HEADER = "Authorization";
}
