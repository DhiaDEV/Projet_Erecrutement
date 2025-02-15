package com.example.erecrutement.CSR.FeedBack_CSR;

import com.example.erecrutement.CSR.Candidature_CSR.CandidatureRepository;
import com.example.erecrutement.CSR.Interview_CSR.InterviewRepository;
import com.example.erecrutement.CSR.Interview_CSR.InterviewService;
import com.example.erecrutement.CSR.User_CSR.UserRepository;
import com.example.erecrutement.Entities.Feedback.Feedback;
import com.example.erecrutement.Entities.Interview.Interview;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedBackService {
    @Autowired
    private FeedBackRepository FeedBackRepository;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  CandidatureRepository candidatureRepository;
    @Autowired
    InterviewRepository interviewRepository;

    @Transactional
    public Feedback saveFeedback(Feedback feedback) {
        if (feedback.getInterview() != null) {
            Integer interviewId = feedback.getInterview().getId();

            // Vérifier si l'interview existe dans la base de données
            Interview managedInterview = interviewRepository.findById(interviewId)
                    .orElseThrow(() -> new RuntimeException("Interview with ID " + interviewId + " not found"));

            feedback.setInterview(managedInterview);
        }
        return FeedBackRepository.save(feedback);
    }




}

