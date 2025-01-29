package com.example.erecrutement.CSR.Candidature_CSR;

import com.example.erecrutement.CSR.Candidature_CSR.DTO.CandidatureRequest;
import com.example.erecrutement.CSR.Candidature_CSR.DTO.CandidatureResponse;
import com.example.erecrutement.Entities.Candidature.Candidature;
import com.example.erecrutement.Entities.Candidature.Status;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class CandidatureService {
    @Autowired
    private CandidatureRepository candidatureRepository;
    public CandidatureResponse addCandidature(CandidatureRequest request) {
        var candidature = new Candidature();
        candidature.setCv(request.getCv());
        candidature.setEmail(request.getEmail());
        candidature.setName(request.getName());
        candidature.setApplicationDate(request.getApplicationDate());
        candidature.setStatus(Status.PENDING);
        candidatureRepository.save(candidature);
        return CandidatureResponse.builder()
                .message("Candidature added successfully")
                .candidature(candidature)
                .build();
    }
}
