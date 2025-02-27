package com.example.erecrutement.Entities.Feedback;

import com.example.erecrutement.Entities.Interview.Interview;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private Rating rating;

    private String feedback;

    @ManyToOne
    @JoinColumn(name = "id_interview")
    private Interview interview;
}