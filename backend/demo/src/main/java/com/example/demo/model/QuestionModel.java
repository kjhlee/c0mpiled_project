package com.example.demo.model;
import java.util.List;
import com.example.demo.enums.Difficulty;
import com.example.demo.enums.RoleType;

import lombok.Data;

@Data
public class QuestionModel {

    private String id;
    private String question;

    private Difficulty difficulty;

    private List<String> concepts;

    private String hint1;
    private String hint2;
    private String hint3;

}
