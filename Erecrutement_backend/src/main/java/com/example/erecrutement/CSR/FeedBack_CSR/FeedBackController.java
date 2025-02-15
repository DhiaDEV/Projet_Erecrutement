package com.example.erecrutement.CSR.FeedBack_CSR;

import com.example.erecrutement.Entities.Feedback.Feedback;
import com.example.erecrutement.Entities.Interview.Interview;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/FeedBack")
@RequiredArgsConstructor
public class FeedBackController {

    private final FeedBackService feedBackService;

    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('RH', 'MANAGER')")
    public ResponseEntity<Feedback> saveFeedBack(@RequestBody Feedback FeedBack) {
        Feedback saveFeedBack = feedBackService.saveFeedback(FeedBack);
        return ResponseEntity.ok(saveFeedBack);
    }


}
