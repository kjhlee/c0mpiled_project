package com.example.demo.model;

import java.util.*;
import com.example.demo.enums.Difficulty;
import com.example.demo.enums.RoleType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionBank {

    private final List<QuestionModel> questions = new ArrayList<>();

    public QuestionBank(RoleType role) {
        switch (role) {
            case SWE -> buildSweQuestions();
            case CLOUD -> buildCloudQuestions();
            case ML -> buildMlQuestions();
        }
    }

    public List<QuestionModel> getQuestions() {
        return questions;
    }

    // --- SWE: 5 questions (E, E, M, M, H) ---
    private void buildSweQuestions() {
        questions.add(q("0", "Two Sum", Difficulty.EASY,
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
            tags("ARRAYS", "HASH_TABLE"),
            "Try using a hash map to store numbers you've already seen.",
            "For each number, check if (target - number) exists in your map.",
            "One pass through the array is enough — store each number's index as you go.",
            "O(n)"));


        questions.add(q("1", "Valid Parentheses", Difficulty.EASY,
            "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
            tags("STACK", "STRINGS"),
            "Think about what data structure lets you match the most recent opening bracket first.",
            "Push opening brackets onto a stack; when you see a closing bracket, check the top.",
            "If the stack is empty when you encounter a closing bracket, or mismatched, return false.",
            "O(n)"));

        questions.add(q("2", "Binary Tree Level Order Traversal", Difficulty.MEDIUM,
            "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
            tags("BINARY_TREE", "BFS", "QUEUE"),
            "Consider processing nodes one level at a time.",
            "Use a queue — at each step, process all nodes currently in the queue (that's one level).",
            "Track the queue size at the start of each level to know how many nodes belong to it.",
            "O(n)"));

        questions.add(q("3", "Number of Islands", Difficulty.MEDIUM,
            "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
            tags("GRAPH", "DFS", "ARRAYS"),
            "When you find a '1', that's a new island — but you need to mark all connected land.",
            "Use DFS or BFS from each unvisited '1' to mark all connected '1's as visited.",
            "Count how many times you initiate a new DFS/BFS — that's your island count.",
            "O(m * n)"));

        questions.add(q("4", "Word Break II", Difficulty.HARD,
            "Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.",
            tags("DYNAMIC_PROGRAMMING", "BACKTRACKING", "STRINGS"),
            "Think about how you can break this into subproblems — if the prefix is a word, recurse on the rest.",
            "Use memoization to cache results for each starting index to avoid recomputation.",
            "Backtrack through all valid prefix splits and combine results from the suffix recursion.",
            "O(n * 2^n) worst case"));
    }

    // --- CLOUD: 5 questions (E, E, M, M, H) ---
    private void buildCloudQuestions() {
        questions.add(q("0", "Design HashMap", Difficulty.EASY,
            "Design a HashMap without using any built-in hash table libraries. Implement put(key, value), get(key), and remove(key) functions.",
            tags("HASH_TABLE", "DESIGN", "ARRAYS"),
            "Think about how to map a key to an index — what operation gives you a bounded range?",
            "Use an array of buckets with a simple hash function (e.g., key % array_size).",
            "Handle collisions with chaining (linked list per bucket).",
            "O(1) average per operation"));

        questions.add(q("1", "Number of Recent Calls", Difficulty.EASY,
            "Write a class RecentCounter that counts the number of recent requests within a certain time frame. Implement ping(t) which adds a new request at time t and returns the number of requests in the past 3000 milliseconds (inclusive).",
            tags("QUEUE", "SLIDING_WINDOW"),
            "You only care about requests within a sliding window of the last 3000ms.",
            "Use a queue — add each new request and remove requests older than t - 3000.",
            "The size of the queue after cleanup is your answer.",
            "O(1) amortized"));

        questions.add(q("2", "Meeting Rooms II", Difficulty.MEDIUM,
            "Given an array of meeting time intervals consisting of start and end times, find the minimum number of conference rooms required.",
            tags("INTERVALS", "HEAP_PRIORITY_QUEUE", "SORTING"),
            "Sort the meetings by start time first.",
            "Use a min-heap to track the earliest ending meeting — if a new meeting starts after it ends, reuse that room.",
            "If the new meeting starts before the earliest end, you need an additional room. The heap size is your answer.",
            "O(n log n)"));

        questions.add(q("3", "Task Scheduler", Difficulty.MEDIUM,
            "Given a char array tasks representing CPU tasks (where each letter represents a different task) and a non-negative integer n representing the cooldown interval between two same tasks, return the least number of intervals the CPU will take to finish all the given tasks.",
            tags("GREEDY", "QUEUE", "HEAP_PRIORITY_QUEUE"),
            "The most frequent task drives the total time — think about how idle slots form around it.",
            "Calculate idle slots based on the max-frequency task, then fill them with other tasks.",
            "Formula approach: total = max(tasks.length, (maxFreq - 1) * (n + 1) + countOfMaxFreqTasks).",
            "O(n)"));

        questions.add(q("4", "LRU Cache", Difficulty.HARD,
            "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement get(key) and put(key, value) with O(1) time complexity. When the cache reaches capacity, evict the least recently used key before inserting a new item.",
            tags("DESIGN", "HASH_TABLE", "LINKED_LIST"),
            "You need O(1) lookup AND O(1) removal/insertion to track usage order.",
            "Combine a HashMap (for O(1) lookup) with a doubly linked list (for O(1) order updates).",
            "On access, move the node to the head of the list. On eviction, remove from the tail.",
            "O(1) per operation"));
    }

    // --- ML: 5 questions (E, E, M, M, H) ---
    private void buildMlQuestions() {
        questions.add(q("0", "Running Sum of 1D Array", Difficulty.EASY,
            "Given an array nums, return the running sum of nums. The running sum is defined as runningSum[i] = sum(nums[0]...nums[i]).",
            tags("ARRAYS", "PREFIX_SUM"),
            "Each element in the result depends on the previous result plus the current element.",
            "You can modify the array in-place: nums[i] += nums[i-1] for i >= 1.",
            "This is the simplest form of a prefix sum — each position stores the cumulative total.",
            "O(n)"));

        questions.add(q("1", "Find Smallest Letter Greater Than Target", Difficulty.EASY,
            "Given a sorted array of characters letters and a character target, return the smallest character in the array that is larger than target. The letters wrap around, so if target is larger than all characters, return the first character.",
            tags("BINARY_SEARCH", "ARRAYS"),
            "The array is sorted — think about how to efficiently find the insertion point.",
            "Use binary search to find the first letter strictly greater than target.",
            "If binary search lands past the end of the array, wrap around and return letters[0].",
            "O(log n)"));

        questions.add(q("2", "Maximum Subarray", Difficulty.MEDIUM,
            "Given an integer array nums, find the subarray with the largest sum and return its sum. A subarray is a contiguous non-empty sequence of elements.",
            tags("ARRAYS", "DYNAMIC_PROGRAMMING"),
            "At each position, decide: extend the current subarray or start fresh from here?",
            "Track currentMax = max(nums[i], currentMax + nums[i]) at each step.",
            "This is Kadane's algorithm — also keep a globalMax to remember the best sum seen so far.",
            "O(n)"));

        questions.add(q("3", "Count of Smaller Numbers After Self", Difficulty.MEDIUM,
            "Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].",
            tags("SORTING", "BINARY_SEARCH", "ARRAYS"),
            "Brute force is O(n^2). Think about processing from right to left and maintaining a sorted structure.",
            "As you iterate from the end, insert each number into a sorted list and use binary search to find its position.",
            "The insertion index in the sorted list tells you how many smaller elements are to its right.",
            "O(n log n)"));

        questions.add(q("4", "Longest Increasing Subsequence", Difficulty.HARD,
            "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
            tags("DYNAMIC_PROGRAMMING", "BINARY_SEARCH", "ARRAYS"),
            "A DP approach: dp[i] = length of the longest increasing subsequence ending at index i.",
            "For each i, check all j < i where nums[j] < nums[i] and take the max dp[j] + 1.",
            "For O(n log n): maintain a tails array and use binary search to find where each element fits.",
            "O(n log n)"));
    }

    // --- Helper methods ---

    private QuestionModel q(String id, String title, Difficulty difficulty,
                            String description, List<String> concepts,
                            String hint1, String hint2, String hint3,
                            String time) {
        QuestionModel qm = new QuestionModel();
        qm.setId(id);
        qm.setQuestion(title + ": " + description);
        qm.setDifficulty(difficulty);
        qm.setConcepts(concepts);
        qm.setHint1(hint1);
        qm.setHint2(hint2);
        qm.setHint3(hint3);
        return qm;
    }

    private List<String> tags(String... values) {
        return Arrays.asList(values);
    }
}
