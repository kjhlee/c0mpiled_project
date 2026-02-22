package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    /** Returns all questions for the given role (SWE, CLOUD, ML). */
    @GetMapping("/by-role/{role}")
    public ResponseEntity<List<QuestionModel>> getQuestionsByRole(@PathVariable String role) {
        RoleType roleType;
        try {
            roleType = RoleType.valueOf(role.toUpperCase().trim());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(questionService.getQuestionsByRole(roleType));
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

    /** Returns the report for the session (all submitted solutions). Role is optional for display. */
    @GetMapping("/report")
    public ResponseEntity<ReportModel> getReport(
            @RequestParam(value = "role", required = false) String roleParam) {
        ReportModel report = new ReportModel();
        if (roleParam != null && !roleParam.isBlank()) {
            try {
                report.setRole(RoleType.valueOf(roleParam.toUpperCase().trim()));
            } catch (IllegalArgumentException ignored) {
                report.setRole(RoleType.SWE);
            }
        } else {
            report.setRole(RoleType.SWE);
        }
        report.setSolutions(questionService.getSolutions());
        return ResponseEntity.ok(report);
    }
}
