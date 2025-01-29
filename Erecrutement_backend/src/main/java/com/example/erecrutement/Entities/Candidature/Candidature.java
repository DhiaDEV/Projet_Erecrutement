package com.example.erecrutement.Entities.Candidature;

import com.example.erecrutement.Entities.Interview.Interview;
import com.example.erecrutement.Entities.Job.Job;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @Lob
    private byte[] cv;

    @Temporal(TemporalType.TIMESTAMP)
    private Date applicationDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "candidature")
    private List<Interview> interviews;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;
}
