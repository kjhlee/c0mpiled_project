package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.model.QuestionBank;
import com.example.demo.model.QuestionModel;
import com.example.demo.model.ReportModel;

@Service
public class QuestionFilterService {

    public List<QuestionModel> getFollowUpQuestions(ReportModel report) {
        List<QuestionModel> pool = new QuestionBank(report.getRole()).getQuestions();

        return pool.stream()
                .filter(q -> q.getDifficulty() == report.getSuggestedDifficulty())
                .filter(q -> q.getConcepts().stream()
                        .anyMatch(c -> report.getWeakConcepts().contains(c)))
                .collect(Collectors.toList());
    }

}
