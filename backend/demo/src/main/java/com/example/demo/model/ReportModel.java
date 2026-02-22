package com.example.demo.model;

import java.util.List;

import com.example.demo.enums.Concepts;
import com.example.demo.enums.Difficulty;
import com.example.demo.enums.RoleType;

import lombok.Data;

@Data
public class ReportModel {

    private RoleType role;
    private List<Concepts> weakConcepts;
    private Difficulty suggestedDifficulty;

    private List<SolutionModel> solutions;
}
