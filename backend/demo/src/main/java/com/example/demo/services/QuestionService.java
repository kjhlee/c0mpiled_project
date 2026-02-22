package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.enums.RoleType;
import com.example.demo.model.QuestionBank;
import com.example.demo.model.QuestionModel;
import com.example.demo.model.SolutionModel;

@Service
public class QuestionService {
    List<QuestionModel> questionList = new QuestionBank(RoleType.SWE).getQuestions();
    List<SolutionModel> solutionList = new ArrayList<>();

    public QuestionModel getQuestionById(String id) {
        return questionList.get(Integer.parseInt(id));
    }

    public void submitAnswer(String id, SolutionModel solution){
        solutionList.add(solution);
    }

    public List<SolutionModel> getSolutions() {
        return solutionList;
    }



}
