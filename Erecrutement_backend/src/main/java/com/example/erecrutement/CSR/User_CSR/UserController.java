package com.example.erecrutement.CSR.User_CSR;

import com.example.erecrutement.CSR.User_CSR.DTO.AuthenticationRequest;
import com.example.erecrutement.CSR.User_CSR.DTO.AuthenticationResponse;
import com.example.erecrutement.Entities.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login (
            @RequestBody AuthenticationRequest request
    ){
        try {
            return ResponseEntity.ok(userService.login(request));
        }catch (BadCredentialsException be){
           AuthenticationResponse errorResponse = AuthenticationResponse.builder()
                    .message("Invalid email or password!")
                    .build();
            return ResponseEntity.status(401).body(errorResponse);
        }catch (Exception e){
            AuthenticationResponse errorResponse= AuthenticationResponse.builder()
                    .message("Authentication failed"+e.getMessage())
                    .build();
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getuser(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

}
