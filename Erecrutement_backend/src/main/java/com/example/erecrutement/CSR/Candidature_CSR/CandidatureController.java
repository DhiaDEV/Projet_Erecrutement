package com.example.erecrutement.CSR.Candidature_CSR;

import com.example.erecrutement.CSR.Candidature_CSR.DTO.CandidatureRequest;
import com.example.erecrutement.CSR.Candidature_CSR.DTO.CandidatureResponse;
import com.example.erecrutement.Entities.Candidature.Candidature;
import com.example.erecrutement.Entities.Candidature.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidature")
public class CandidatureController {
    @Autowired
    private CandidatureService candidatureService;

    @PostMapping("/add")
    public ResponseEntity<CandidatureResponse> AddCandidature(@RequestBody CandidatureRequest request) {
        return ResponseEntity.ok(candidatureService.addCandidature(request));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Candidature>> GetCandidature(){
        return ResponseEntity.ok(candidatureService.getAll());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<CandidatureResponse> GetCandidatureById(@PathVariable Long id){
        return ResponseEntity.ok(candidatureService.getCandidatureById(id));
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<Candidature> updateCandidatureStatus(@PathVariable Long id, @RequestParam Status newStatus) {
        Candidature updatedCandidature = candidatureService.updateStatus(id, newStatus);
        return ResponseEntity.ok(updatedCandidature);
    }


}
