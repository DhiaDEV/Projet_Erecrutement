package com.example.erecrutement.Entities.Candidature;

import com.example.erecrutement.Entities.Interview.Interview;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "candidatures")
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;

    @Lob
    private byte[] cv;

    @Temporal(TemporalType.DATE)
    private Date applicationDate;

    @Enumerated(EnumType.STRING)
    private CandidatureStatus status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "interview_id")
    private Interview interview;


}
