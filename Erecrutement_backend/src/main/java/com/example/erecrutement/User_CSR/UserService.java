package com.example.erecrutement.User_CSR;

import com.example.erecrutement.Config.JwtService;
import com.example.erecrutement.User_CSR.DTO.AuthenticationRequest;
import com.example.erecrutement.User_CSR.DTO.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("userId", user.getId());

        var jwtToken = jwtService.generateToken(extraClaims,user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .message("Login Successfully")
                .build();
    }
}
