package com.example.erecrutement.Entities.Interview;

import com.example.erecrutement.Entities.Feedback.Feedback;
import com.example.erecrutement.Entities.User.User;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "interviews")
public class Interview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private String location;
    private String motif;

    @ManyToOne
    @JoinColumn(name = "rh_id")
    private User rh;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "feedback_id")
    private Feedback feedback;

}
