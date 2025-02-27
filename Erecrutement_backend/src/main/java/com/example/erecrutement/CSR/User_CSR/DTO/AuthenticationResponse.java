package com.example.erecrutement.CSR.User_CSR.DTO;

import com.example.erecrutement.Entities.User.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String username;
    private String message;
    private User user;
}
