package com.example.demo.model;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.model.QuestionModel;

public class QuestionList {
    
    private List<QuestionModel> questionList = new ArrayList<>();

    //TODO: construct a list of leetcode questions from Ethans Question bank
    public QuestionList() {
        // construct a list of Leetcode Questions
        for (int i = 0; i < 5; i++){
            QuestionModel question = new QuestionModel();
            question.setId("question" + i);
            question.setQuestion("This is question " + i);
            question.setDifficulty(null);
            question.setConcepts(null);
            question.setHint1("This is your first hint");
            question.setHint2(null);
            question.setHint3(null);
            questionList.add(question);
        }
    }

    // getter for questionList
    public List<QuestionModel> getQuestionList() {
        return questionList;
    }

}
