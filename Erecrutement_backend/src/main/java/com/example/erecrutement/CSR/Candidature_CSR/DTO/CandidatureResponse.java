package com.example.erecrutement.CSR.Candidature_CSR.DTO;

import com.example.erecrutement.Entities.Candidature.Candidature;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CandidatureResponse {
    private Candidature candidature;
    private String message ;
}
