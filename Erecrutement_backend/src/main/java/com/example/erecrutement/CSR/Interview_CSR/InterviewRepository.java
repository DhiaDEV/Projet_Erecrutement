package com.example.erecrutement.CSR.Interview_CSR;

import com.example.erecrutement.Entities.Interview.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Integer> {

    Optional<Interview> findByCandidatureId(Integer candidatureId);

}
