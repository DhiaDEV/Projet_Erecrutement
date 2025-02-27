package com.example.erecrutement.Entities.Interview;

import com.example.erecrutement.Entities.Candidature.Candidature;
import com.example.erecrutement.Entities.Feedback.Feedback;
import com.example.erecrutement.Entities.User.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Interview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Temporal(TemporalType.DATE)
    private Date date;

    private String location;
    private String motif;

    @Enumerated(EnumType.STRING)
    private Phase phase;
    @ManyToOne
    @JoinColumn(name = "candidature_id")
    private Candidature candidature;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @ManyToOne
    @JoinColumn(name = "rh_id")
    private User rh;

    // Getter pour récupérer l'ID du manager
    public Long getUserId() {
        return manager != null ? manager.getId() : null;
    }
}
