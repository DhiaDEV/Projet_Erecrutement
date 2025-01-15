package com.example.erecrutement.Entities.Notification;

import com.example.erecrutement.Entities.User.User;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String message;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    @Enumerated(EnumType.STRING)
    private NotificationStatus status;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private User recipient;
}