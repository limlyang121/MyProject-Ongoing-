package com.myapp.restapi.researchconference.Util;

import com.myapp.restapi.researchconference.entity.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {
    private String SECRET_KEY = "SomeRandomStringalsdjsadjsadlksajdlkasjdlakjdlajdadjalkdjalsdjaiwjdaildjslk";

    public String extractUserName(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired (String token){
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(CustomUserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", userDetails.getAuthorities());
        claims.put("id",  userDetails.getId());

        return createToken(claims, userDetails.getUsername());

    }

    private String createToken(Map<String, Object> claims, String subject){
        return Jwts.builder().setClaims(claims).setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();

    }

    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}
