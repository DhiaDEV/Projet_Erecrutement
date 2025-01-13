package com.example.erecrutement.Entities.Feedback;

import jakarta.persistence.*;

@Entity
@Table(name = "feedbacks")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private Rating ratingRH;

    @Enumerated(EnumType.STRING)
    private Rating ratingManager;

    @Column(columnDefinition = "TEXT")
    private String feedbackRH;

    @Column(columnDefinition = "TEXT")
    private String feedbackManager;

}