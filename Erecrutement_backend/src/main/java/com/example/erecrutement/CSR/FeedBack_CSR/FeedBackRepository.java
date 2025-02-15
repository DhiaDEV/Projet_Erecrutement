package com.example.erecrutement.CSR.FeedBack_CSR;

import com.example.erecrutement.Entities.Feedback.Feedback;
import com.example.erecrutement.Entities.Interview.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackRepository extends JpaRepository<Feedback, Integer> {
}
