package com.example.erecrutement.CSR.Candidature_CSR;

import com.example.erecrutement.CSR.Candidature_CSR.DTO.CandidatureRequest;
import com.example.erecrutement.CSR.Candidature_CSR.DTO.CandidatureResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidature")
public class CandidatureController {
    @Autowired
    private CandidatureService candidatureService;

    @PostMapping("/add")
    public ResponseEntity<CandidatureResponse> addCar(@RequestBody CandidatureRequest request) {
        return ResponseEntity.ok(candidatureService.addCandidature(request));
    }

}
