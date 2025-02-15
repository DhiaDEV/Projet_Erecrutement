package com.example.erecrutement.CSR.Interview_CSR;

import com.example.erecrutement.Entities.Interview.Interview;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('RH', 'MANAGER')")
    public ResponseEntity<Interview> saveInterview(@RequestBody Interview interview) {
        Interview savedInterview = interviewService.saveInterview(interview);
        return ResponseEntity.ok(savedInterview);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('RH', 'MANAGER')")
    public ResponseEntity<List<Interview>> getAllInterviews() {
        List<Interview> interviews = interviewService.getAllInterviews();
        return ResponseEntity.ok(interviews);
    }
    @GetMapping("/findbyid/{id}")
    @PreAuthorize("hasAnyRole('RH', 'MANAGER')")
    public ResponseEntity<Interview> getAllInterviews(@PathVariable Integer id) {
        Interview interview = interviewService.findBycandId(id);
        return ResponseEntity.ok(interview);
    }

}
