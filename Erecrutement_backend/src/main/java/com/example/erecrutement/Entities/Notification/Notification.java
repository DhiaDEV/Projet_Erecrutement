package com.example.erecrutement.Entities.Notification;

import com.example.erecrutement.Entities.User.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private User recipient;

    private String message;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

}