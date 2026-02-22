package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.enums.RoleType;
import com.example.demo.model.QuestionModel;
import com.example.demo.model.ReportModel;
import com.example.demo.model.SolutionModel;
import com.example.demo.services.QuestionService;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    //TODO: Get questions with request id /{request_ID}
    @GetMapping("/{id}")
    public ResponseEntity<QuestionModel> getQuestionById(@PathVariable String id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }
    //TODO: POST question with answer /{ID}
    @PostMapping("/{id}")
    public ResponseEntity<SolutionModel> submitAnswer(@PathVariable String id, @RequestBody SolutionModel solution) {
        
        questionService.submitAnswer(id, solution);
        return ResponseEntity.ok(solution);
    }

    //TODO: Getter to generate the report of the solutions
    @GetMapping("/report")
    public ResponseEntity<ReportModel> getReport() {
        ReportModel report = new ReportModel();
        report.setRole(RoleType.SWE);
        report.setSolutions(questionService.getSolutions());

        // System.out.println(questionService.getSolutions().toString());
        return ResponseEntity.ok(report);
    }
}
