package com.example.erecrutement.CSR.Candidature_CSR.DTO;

import com.example.erecrutement.Entities.Candidature.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CandidatureRequest {
    private String name;
    private String email;
    @Lob
    private byte[] cv;

    @Temporal(TemporalType.TIMESTAMP)
    private Date applicationDate;

    @Enumerated(EnumType.STRING)
    private Status status;

}
