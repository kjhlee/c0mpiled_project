package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.QuestionModel;
import com.example.demo.model.ReportModel;
import com.example.demo.services.QuestionFilterService;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionFilterService filterService;

    public QuestionController(QuestionFilterService filterService) {
        this.filterService = filterService;
    }

    @PostMapping("/follow-up")
    public List<QuestionModel> getFollowUpQuestions(@RequestBody ReportModel report) {
        return filterService.getFollowUpQuestions(report);
    }

}
