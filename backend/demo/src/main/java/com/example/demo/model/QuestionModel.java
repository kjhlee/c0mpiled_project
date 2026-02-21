package com.example.demo.model;
import java.util.List;
import com.example.demo.enums.Difficulty;

import lombok.Data;

@Data
public class QuestionModel {

    private String id;
    private String question;

    private Difficulty difficulty;

    private List<String> concepts;

    private String hint1;
    private Boolean hint1Used = false;

    private String hint2;
    private Boolean hint2Used = false;

    private String hint3;
    private Boolean hint3Used = false;

    private String time;

}
