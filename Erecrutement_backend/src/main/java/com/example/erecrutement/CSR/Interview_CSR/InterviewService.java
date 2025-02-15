package com.example.erecrutement.CSR.Interview_CSR;

import com.example.erecrutement.CSR.Candidature_CSR.CandidatureRepository;
import com.example.erecrutement.CSR.User_CSR.UserRepository;
import com.example.erecrutement.Entities.Candidature.Candidature;
import com.example.erecrutement.Entities.Interview.Interview;
import com.example.erecrutement.Entities.Interview.Phase;
import com.example.erecrutement.Entities.User.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewService {
    @Autowired
    private  InterviewRepository interviewRepository;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  CandidatureRepository candidatureRepository;

    public Interview saveInterview(Interview interview) {
        return interviewRepository.save(interview);
    }
    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }
    public Interview findBycandId(Integer id) {
        return interviewRepository.findByCandidatureId(id).get();
    }

}

