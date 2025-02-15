package com.example.erecrutement.CSR.Candidature_CSR;

import com.example.erecrutement.CSR.Candidature_CSR.DTO.CandidatureRequest;
import com.example.erecrutement.CSR.Candidature_CSR.DTO.CandidatureResponse;
import com.example.erecrutement.Entities.Candidature.Candidature;
import com.example.erecrutement.Entities.Candidature.Status;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

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

    public List<Candidature> getAll() {
        return candidatureRepository.findAll();
    }


    public CandidatureResponse getCandidatureById(Long id) {
        try {
            var candidature =candidatureRepository.findById(id)
                    .orElseThrow(()->new RuntimeException("Candidature not found !"));
            return CandidatureResponse.builder()
                    .candidature(candidature)
                    .message("Candidature found successfully")
                    .build();
        }catch (RuntimeException ex){
            return CandidatureResponse.builder()
                    .message(ex.getMessage())
                    .build();
        }
    }

    public Candidature updateStatus(Long id, Status newStatus) {
        Candidature candidature = candidatureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidature non trouvée"));
        candidature.setStatus(newStatus);
        return candidatureRepository.save(candidature);
    }
}
