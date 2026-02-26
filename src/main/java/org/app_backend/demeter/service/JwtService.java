package org.app_backend.demeter.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.app_backend.demeter.mapper.UserMapper;
import org.app_backend.demeter.model.UserModel;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static String SECRET_KEY;
    private static final long ACCESS_EXPIRATION = 15 * 60 ; // 15 minutes in milliseconds
    private static final long REFRESH_EXPIRATION = 7 * 24 * 60 * 60; // 7 days in milliseconds

    public JwtService() {
        try {
            KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA256");
            SecretKey secretKey = keyGenerator.generateKey();
            SECRET_KEY = Base64.getEncoder().encodeToString(secretKey.getEncoded());
        }
        catch(RuntimeException | NoSuchAlgorithmException runtimeException) {
            throw new RuntimeException("An error occurred while generating secret key for JWT");
        }
    }

    public SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET_KEY));
    }

    public Map<String,Object> generateAccessToken(UserModel userModel) {
        Map<String,String> claims = new HashMap<>();
        claims.put("type", "access");
        Date EXPIRATION_TIME = new Date(System.currentTimeMillis() + ACCESS_EXPIRATION);
        Date ISSUED_AT = new Date(System.currentTimeMillis());
        String token = Jwts.builder()
                .claims(claims)
                .subject(userModel.getPhoneNo())
                .expiration(EXPIRATION_TIME)
                .issuedAt(ISSUED_AT)
                .signWith(getSecretKey())
                .compact();
        return Map.of("accessToken", token,"expiresIn", ACCESS_EXPIRATION, "tokenType", "Bearer","issuedAt", ISSUED_AT);
    }

     public Map<String,Object> generateRefreshToken(UserModel userModel) {
        Map<String,String> claims = new HashMap<>();
        claims.put("type", "refresh");
         Date EXPIRATION_TIME = new Date(System.currentTimeMillis() + REFRESH_EXPIRATION);
         Date ISSUED_AT = new Date(System.currentTimeMillis());
         String token = Jwts.builder()
                 .claims(claims)
                 .subject(userModel.getPhoneNo())
                 .expiration(EXPIRATION_TIME)
                 .issuedAt(ISSUED_AT)
                 .signWith(getSecretKey())
                 .compact();
         return Map.of("refreshToken", token,"expiresIn", REFRESH_EXPIRATION, "tokenType", "Bearer","issuedAt", ISSUED_AT);
    }

    public String getTokenType(String token) {
        Claims claims = extractClaims(token);
        return claims.get("type", String.class);
    }

    public Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public <T>T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractClaims(token);
        return claimsResolver.apply(claims);
    }

    public String getPhoneNo(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date getExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String phoneNo = getPhoneNo(token);
        return (phoneNo.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
