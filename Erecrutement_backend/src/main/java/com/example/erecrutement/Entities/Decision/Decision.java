package com.example.erecrutement.Entities.Decision;

import com.example.erecrutement.Entities.Interview.Interview;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Decision {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private DecisionType finalDecision;

    private String reason;

    @OneToOne
    @JoinColumn(name = "interview_id")
    private Interview interview;
}
