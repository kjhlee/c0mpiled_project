package com.example.demo.services;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.enums.Difficulty;
import com.example.demo.model.QuestionBank;
import com.example.demo.model.QuestionModel;
import com.example.demo.model.ReportModel;

@Service
public class QuestionFilterService {

    private static final int MIN_QUESTIONS = 3;
    private static final int MAX_QUESTIONS = 5;

    public List<QuestionModel> getFollowUpQuestions(ReportModel report) {
        List<QuestionModel> pool = new QuestionBank(report.getRole()).getQuestions();
        Difficulty target = report.getSuggestedDifficulty();

        // Exclude questions the user already answered
        Set<String> answeredIds = report.getSolutions() != null
                ? report.getSolutions().stream()
                        .map(s -> s.getId())
                        .collect(Collectors.toSet())
                : Set.of();

        // Keep only unanswered questions that overlap with weak concepts
        List<QuestionModel> conceptMatches = pool.stream()
                .filter(q -> !answeredIds.contains(q.getId()))
                .filter(q -> q.getConcepts().stream()
                        .anyMatch(c -> report.getWeakConcepts().contains(c)))
                .collect(Collectors.toList());

        // Sort: exact difficulty match first, then by number of overlapping concepts (desc)
        conceptMatches.sort(Comparator
                .comparing((QuestionModel q) -> q.getDifficulty() != target)
                .thenComparing(q -> -countOverlap(q, report)));

        return conceptMatches.stream()
                .limit(MAX_QUESTIONS)
                .collect(Collectors.toList());
    }

    private long countOverlap(QuestionModel q, ReportModel report) {
        return q.getConcepts().stream()
                .filter(c -> report.getWeakConcepts().contains(c))
                .count();
    }

}
