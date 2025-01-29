package com.example.erecrutement.CSR.Candidature_CSR;

import com.example.erecrutement.Entities.Candidature.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidatureRepository extends JpaRepository<Candidature,Long> {
}
