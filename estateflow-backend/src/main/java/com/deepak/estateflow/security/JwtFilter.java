package com.deepak.estateflow.security;

import com.deepak.estateflow.repository.UserRepository;
import com.deepak.estateflow.entity.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtFilter(
            JwtService jwtService,
            UserRepository userRepository
    ) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        System.out.println("JwtFilter executed");

        request.getHeaderNames()
                .asIterator()
                .forEachRemaining(System.out::println);

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }
        System.out.println("=================================");
        System.out.println("Authorization Header = " + authHeader);
        System.out.println("=================================");

        request.getHeaderNames()
                .asIterator()
                .forEachRemaining(header ->
                        System.out.println(
                                header + " = " +
                                        request.getHeader(header)
                        )
                );

        System.out.println("=======================");

        if (authHeader != null &&
                authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            System.out.println("Token received: " + token);

            boolean valid = jwtService.isTokenValid(token);

            System.out.println("Token valid? " + valid);

            if (valid) {

                String email = jwtService.extractEmail(token);

                System.out.println("Email: " + email);

                User user = userRepository
                        .findByEmail(email)
                        .orElseThrow();

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                List.of(
                                        new SimpleGrantedAuthority(
                                                "ROLE_" + user.getRole()
                                        )
                                )
                        );

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);
                System.out.println(
                        SecurityContextHolder.getContext().getAuthentication()
                );

                System.out.println("JWT VALID");
                System.out.println("Email: " + email);
                System.out.println("ROLE_" + user.getRole());

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

                System.out.println("Authentication set");
            }
        }

        filterChain.doFilter(request, response);
    }
}