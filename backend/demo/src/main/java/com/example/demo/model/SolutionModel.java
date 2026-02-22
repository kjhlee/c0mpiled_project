package com.example.demo.model;

import lombok.Data;

@Data  
public class SolutionModel {

    private String id;
    private String solution;
    private String time;

    private Boolean correct;

    private Boolean hint1used;
    private Boolean hint2used;
    private Boolean hint3used;
}
