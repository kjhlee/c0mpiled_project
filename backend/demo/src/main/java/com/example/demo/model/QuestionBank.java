package com.example.demo.model;

import java.util.*;
import com.example.demo.enums.Concepts;
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

    // --- SWE questions ---
    private void buildSweQuestions() {
        questions.add(q("0", "Two Sum", Difficulty.EASY,
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
            tags(Concepts.ARRAYS, Concepts.HASH_TABLE),
            "Try using a hash map to store numbers you've already seen.",
            "For each number, check if (target - number) exists in your map.",
            "One pass through the array is enough — store each number's index as you go.",
            "O(n)"));

        questions.add(q("1", "Valid Parentheses", Difficulty.EASY,
            "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
            tags(Concepts.STACK, Concepts.STRINGS),
            "Think about what data structure lets you match the most recent opening bracket first.",
            "Push opening brackets onto a stack; when you see a closing bracket, check the top.",
            "If the stack is empty when you encounter a closing bracket, or mismatched, return false.",
            "O(n)"));

        questions.add(q("2", "Binary Tree Level Order Traversal", Difficulty.MEDIUM,
            "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
            tags(Concepts.BINARY_TREE, Concepts.BFS, Concepts.QUEUE),
            "Consider processing nodes one level at a time.",
            "Use a queue — at each step, process all nodes currently in the queue (that's one level).",
            "Track the queue size at the start of each level to know how many nodes belong to it.",
            "O(n)"));

        questions.add(q("3", "Number of Islands", Difficulty.MEDIUM,
            "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
            tags(Concepts.GRAPH, Concepts.DFS, Concepts.ARRAYS),
            "When you find a '1', that's a new island — but you need to mark all connected land.",
            "Use DFS or BFS from each unvisited '1' to mark all connected '1's as visited.",
            "Count how many times you initiate a new DFS/BFS — that's your island count.",
            "O(m * n)"));

        questions.add(q("4", "Word Break II", Difficulty.HARD,
            "Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.",
            tags(Concepts.DYNAMIC_PROGRAMMING, Concepts.BACKTRACKING, Concepts.STRINGS),
            "Think about how you can break this into subproblems — if the prefix is a word, recurse on the rest.",
            "Use memoization to cache results for each starting index to avoid recomputation.",
            "Backtrack through all valid prefix splits and combine results from the suffix recursion.",
            "O(n * 2^n) worst case"));

        questions.add(q("5", "Merge Intervals", Difficulty.MEDIUM,
            "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
            tags(Concepts.INTERVALS, Concepts.SORTING),
            "Sort the intervals by their start time first.",
            "Compare each interval's start with the previous interval's end to check for overlap.",
            "If overlapping, merge by extending the end. Otherwise, add a new interval to the result.",
            "O(n log n)"));

        questions.add(q("6", "Coin Change", Difficulty.MEDIUM,
            "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up, return -1.",
            tags(Concepts.DYNAMIC_PROGRAMMING, Concepts.ARRAYS),
            "Think of this as a bottom-up DP problem — build solutions for smaller amounts first.",
            "dp[i] = minimum coins needed to make amount i. Initialize dp[0] = 0, rest = infinity.",
            "For each amount, try every coin and take the minimum of dp[amount - coin] + 1.",
            "O(amount * coins.length)"));

        questions.add(q("7", "Climbing Stairs", Difficulty.EASY,
            "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
            tags(Concepts.DYNAMIC_PROGRAMMING),
            "The number of ways to reach step n depends on the ways to reach step n-1 and n-2.",
            "This is essentially the Fibonacci sequence: dp[n] = dp[n-1] + dp[n-2].",
            "You only need two variables to track the previous two values — no array needed.",
            "O(n)"));

        questions.add(q("8", "Longest Substring Without Repeating Characters", Difficulty.MEDIUM,
            "Given a string s, find the length of the longest substring without repeating characters.",
            tags(Concepts.SLIDING_WINDOW, Concepts.HASH_TABLE, Concepts.STRINGS),
            "Use two pointers to maintain a window of unique characters.",
            "Expand the right pointer and track characters in a set or map.",
            "When a duplicate is found, shrink from the left until the window is valid again.",
            "O(n)"));

        questions.add(q("9", "Course Schedule", Difficulty.MEDIUM,
            "There are a total of numCourses courses you have to take. Some courses have prerequisites. Given the total number of courses and a list of prerequisite pairs, determine if it is possible to finish all courses.",
            tags(Concepts.GRAPH, Concepts.TOPOLOGICAL_SORT, Concepts.BFS),
            "Model courses and prerequisites as a directed graph.",
            "If there's a cycle in the graph, it's impossible to finish all courses.",
            "Use topological sort (Kahn's algorithm with BFS or DFS with cycle detection).",
            "O(V + E)"));

        questions.add(q("10", "Serialize and Deserialize Binary Tree", Difficulty.HARD,
            "Design an algorithm to serialize a binary tree to a string and deserialize that string back to the original tree structure.",
            tags(Concepts.BINARY_TREE, Concepts.DFS, Concepts.DESIGN),
            "Use preorder traversal and represent null nodes with a sentinel value like 'null'.",
            "Join values with a delimiter during serialization.",
            "During deserialization, use a queue/index to reconstruct the tree recursively.",
            "O(n)"));

        questions.add(q("11", "Find Median from Data Stream", Difficulty.HARD,
            "Design a data structure that supports addNum(int num) to add an integer from the data stream, and findMedian() to return the median of all elements so far.",
            tags(Concepts.HEAP_PRIORITY_QUEUE, Concepts.DESIGN),
            "Maintain two heaps: a max-heap for the lower half and a min-heap for the upper half.",
            "Balance the heaps so their sizes differ by at most 1.",
            "The median is either the top of the larger heap or the average of both tops.",
            "O(log n) add, O(1) find median"));
    }

    // --- CLOUD questions ---
    private void buildCloudQuestions() {
        questions.add(q("0", "Design HashMap", Difficulty.EASY,
            "Design a HashMap without using any built-in hash table libraries. Implement put(key, value), get(key), and remove(key) functions.",
            tags(Concepts.HASH_TABLE, Concepts.DESIGN, Concepts.ARRAYS),
            "Think about how to map a key to an index — what operation gives you a bounded range?",
            "Use an array of buckets with a simple hash function (e.g., key % array_size).",
            "Handle collisions with chaining (linked list per bucket).",
            "O(1) average per operation"));

        questions.add(q("1", "Number of Recent Calls", Difficulty.EASY,
            "Write a class RecentCounter that counts the number of recent requests within a certain time frame. Implement ping(t) which adds a new request at time t and returns the number of requests in the past 3000 milliseconds (inclusive).",
            tags(Concepts.QUEUE, Concepts.SLIDING_WINDOW),
            "You only care about requests within a sliding window of the last 3000ms.",
            "Use a queue — add each new request and remove requests older than t - 3000.",
            "The size of the queue after cleanup is your answer.",
            "O(1) amortized"));

        questions.add(q("2", "Meeting Rooms II", Difficulty.MEDIUM,
            "Given an array of meeting time intervals consisting of start and end times, find the minimum number of conference rooms required.",
            tags(Concepts.INTERVALS, Concepts.HEAP_PRIORITY_QUEUE, Concepts.SORTING),
            "Sort the meetings by start time first.",
            "Use a min-heap to track the earliest ending meeting — if a new meeting starts after it ends, reuse that room.",
            "If the new meeting starts before the earliest end, you need an additional room. The heap size is your answer.",
            "O(n log n)"));

        questions.add(q("3", "Task Scheduler", Difficulty.MEDIUM,
            "Given a char array tasks representing CPU tasks (where each letter represents a different task) and a non-negative integer n representing the cooldown interval between two same tasks, return the least number of intervals the CPU will take to finish all the given tasks.",
            tags(Concepts.GREEDY, Concepts.QUEUE, Concepts.HEAP_PRIORITY_QUEUE),
            "The most frequent task drives the total time — think about how idle slots form around it.",
            "Calculate idle slots based on the max-frequency task, then fill them with other tasks.",
            "Formula approach: total = max(tasks.length, (maxFreq - 1) * (n + 1) + countOfMaxFreqTasks).",
            "O(n)"));

        questions.add(q("4", "LRU Cache", Difficulty.HARD,
            "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement get(key) and put(key, value) with O(1) time complexity. When the cache reaches capacity, evict the least recently used key before inserting a new item.",
            tags(Concepts.DESIGN, Concepts.HASH_TABLE, Concepts.LINKED_LIST),
            "You need O(1) lookup AND O(1) removal/insertion to track usage order.",
            "Combine a HashMap (for O(1) lookup) with a doubly linked list (for O(1) order updates).",
            "On access, move the node to the head of the list. On eviction, remove from the tail.",
            "O(1) per operation"));

        questions.add(q("5", "Implement Trie", Difficulty.MEDIUM,
            "Implement a trie (prefix tree) with insert, search, and startsWith methods.",
            tags(Concepts.TRIE, Concepts.DESIGN),
            "Each node holds a map of children (character -> node) and a boolean for end-of-word.",
            "Insert: walk character by character, creating nodes as needed. Mark the last node.",
            "Search and startsWith are similar walks — search checks the end-of-word flag.",
            "O(m) per operation where m is the word length"));

        questions.add(q("6", "Time Based Key-Value Store", Difficulty.MEDIUM,
            "Design a time-based key-value data structure that can store multiple values for the same key at different timestamps and retrieve the value at a certain timestamp.",
            tags(Concepts.DESIGN, Concepts.BINARY_SEARCH, Concepts.HASH_TABLE),
            "Store values in a list ordered by timestamp for each key.",
            "Use binary search to find the largest timestamp <= the requested timestamp.",
            "A TreeMap or manual binary search on the timestamp list both work.",
            "O(log n) get, O(1) set"));

        questions.add(q("7", "Min Stack", Difficulty.EASY,
            "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
            tags(Concepts.STACK, Concepts.DESIGN),
            "You need to track the minimum even as elements are popped.",
            "Use a second stack (or pair) that tracks the minimum at each level.",
            "When you push, also push the current minimum onto the min stack.",
            "O(1) per operation"));

        questions.add(q("8", "Insert Delete GetRandom O(1)", Difficulty.MEDIUM,
            "Implement the RandomizedSet class with insert, remove, and getRandom, each in average O(1) time.",
            tags(Concepts.DESIGN, Concepts.HASH_TABLE, Concepts.ARRAYS),
            "Use an array for O(1) random access and a hashmap for O(1) lookup.",
            "On remove, swap the element with the last element in the array, then pop.",
            "The hashmap maps values to their indices in the array.",
            "O(1) average per operation"));

        questions.add(q("9", "Snapshot Array", Difficulty.MEDIUM,
            "Implement a SnapshotArray that supports set(index, val), snap() which takes a snapshot and returns the snap_id, and get(index, snap_id) which returns the value at the given index for the given snap_id.",
            tags(Concepts.DESIGN, Concepts.BINARY_SEARCH, Concepts.ARRAYS),
            "Don't copy the whole array on each snap — that's too expensive.",
            "For each index, store a list of (snap_id, value) pairs.",
            "Use binary search to find the right value for a given snap_id.",
            "O(log S) get where S is snap count"));

        questions.add(q("10", "Design Twitter", Difficulty.HARD,
            "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and get the 10 most recent tweets in the user's news feed.",
            tags(Concepts.DESIGN, Concepts.HEAP_PRIORITY_QUEUE, Concepts.HASH_TABLE),
            "Maintain a tweet list per user and a set of followees per user.",
            "For the news feed, merge the tweet lists of all followees — like merging k sorted lists.",
            "Use a max-heap (priority queue) to efficiently get the top 10 most recent tweets.",
            "O(k log k) for feed where k = number of followees"));

        questions.add(q("11", "Sliding Window Maximum", Difficulty.HARD,
            "You are given an array of integers nums and an integer k. There is a sliding window of size k moving from the very left to the very right. Return the max value in each window position.",
            tags(Concepts.SLIDING_WINDOW, Concepts.QUEUE, Concepts.ARRAYS),
            "A brute-force scan of each window is O(nk). Think about a structure that tracks the max efficiently.",
            "Use a monotonic decreasing deque — remove smaller elements from the back before adding.",
            "Remove elements from the front when they fall outside the window. The front is always the max.",
            "O(n)"));
    }

    // --- ML questions ---
    private void buildMlQuestions() {
        questions.add(q("0", "Running Sum of 1D Array", Difficulty.EASY,
            "Given an array nums, return the running sum of nums. The running sum is defined as runningSum[i] = sum(nums[0]...nums[i]).",
            tags(Concepts.ARRAYS, Concepts.PREFIX_SUM),
            "Each element in the result depends on the previous result plus the current element.",
            "You can modify the array in-place: nums[i] += nums[i-1] for i >= 1.",
            "This is the simplest form of a prefix sum — each position stores the cumulative total.",
            "O(n)"));

        questions.add(q("1", "Find Smallest Letter Greater Than Target", Difficulty.EASY,
            "Given a sorted array of characters letters and a character target, return the smallest character in the array that is larger than target. The letters wrap around, so if target is larger than all characters, return the first character.",
            tags(Concepts.BINARY_SEARCH, Concepts.ARRAYS),
            "The array is sorted — think about how to efficiently find the insertion point.",
            "Use binary search to find the first letter strictly greater than target.",
            "If binary search lands past the end of the array, wrap around and return letters[0].",
            "O(log n)"));

        questions.add(q("2", "Maximum Subarray", Difficulty.MEDIUM,
            "Given an integer array nums, find the subarray with the largest sum and return its sum. A subarray is a contiguous non-empty sequence of elements.",
            tags(Concepts.ARRAYS, Concepts.DYNAMIC_PROGRAMMING),
            "At each position, decide: extend the current subarray or start fresh from here?",
            "Track currentMax = max(nums[i], currentMax + nums[i]) at each step.",
            "This is Kadane's algorithm — also keep a globalMax to remember the best sum seen so far.",
            "O(n)"));

        questions.add(q("3", "Count of Smaller Numbers After Self", Difficulty.MEDIUM,
            "Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].",
            tags(Concepts.SORTING, Concepts.BINARY_SEARCH, Concepts.ARRAYS),
            "Brute force is O(n^2). Think about processing from right to left and maintaining a sorted structure.",
            "As you iterate from the end, insert each number into a sorted list and use binary search to find its position.",
            "The insertion index in the sorted list tells you how many smaller elements are to its right.",
            "O(n log n)"));

        questions.add(q("4", "Longest Increasing Subsequence", Difficulty.HARD,
            "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
            tags(Concepts.DYNAMIC_PROGRAMMING, Concepts.BINARY_SEARCH, Concepts.ARRAYS),
            "A DP approach: dp[i] = length of the longest increasing subsequence ending at index i.",
            "For each i, check all j < i where nums[j] < nums[i] and take the max dp[j] + 1.",
            "For O(n log n): maintain a tails array and use binary search to find where each element fits.",
            "O(n log n)"));

        questions.add(q("5", "Top K Frequent Elements", Difficulty.MEDIUM,
            "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
            tags(Concepts.HEAP_PRIORITY_QUEUE, Concepts.HASH_TABLE, Concepts.ARRAYS),
            "First, count the frequency of each element using a hash map.",
            "Use a min-heap of size k to track the top k frequent elements.",
            "Alternatively, use bucket sort where the index is the frequency.",
            "O(n log k)"));

        questions.add(q("6", "K Closest Points to Origin", Difficulty.MEDIUM,
            "Given an array of points on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).",
            tags(Concepts.HEAP_PRIORITY_QUEUE, Concepts.SORTING),
            "Distance to origin is sqrt(x^2 + y^2), but you can compare x^2 + y^2 directly.",
            "Use a max-heap of size k — if a new point is closer than the farthest in the heap, swap.",
            "Alternatively, use quickselect for average O(n) performance.",
            "O(n log k)"));

        questions.add(q("7", "Pascal's Triangle", Difficulty.EASY,
            "Given an integer numRows, return the first numRows of Pascal's triangle. Each number is the sum of the two numbers directly above it.",
            tags(Concepts.ARRAYS, Concepts.DYNAMIC_PROGRAMMING),
            "Start with [1]. Each new row starts and ends with 1.",
            "For inner elements: row[j] = previousRow[j-1] + previousRow[j].",
            "Build each row based on the previous one — this is iterative DP.",
            "O(numRows^2)"));

        questions.add(q("8", "Search a 2D Matrix", Difficulty.MEDIUM,
            "Write an efficient algorithm that searches for a value in an m x n matrix. Integers in each row are sorted from left to right. The first integer of each row is greater than the last integer of the previous row.",
            tags(Concepts.BINARY_SEARCH, Concepts.ARRAYS),
            "Treat the 2D matrix as a sorted 1D array of m*n elements.",
            "Use a single binary search with index mapping: row = mid / n, col = mid % n.",
            "This gives you O(log(m*n)) time complexity.",
            "O(log(m*n))"));

        questions.add(q("9", "Find Peak Element", Difficulty.MEDIUM,
            "A peak element is an element that is strictly greater than its neighbors. Given an integer array nums, find a peak element and return its index. The array may contain multiple peaks; return the index to any of them.",
            tags(Concepts.BINARY_SEARCH, Concepts.ARRAYS),
            "Binary search works because if nums[mid] < nums[mid+1], a peak must exist to the right.",
            "Similarly, if nums[mid] < nums[mid-1], a peak exists to the left.",
            "Narrow the search range until low == high — that's your peak.",
            "O(log n)"));

        questions.add(q("10", "Edit Distance", Difficulty.HARD,
            "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have three operations: insert, delete, or replace a character.",
            tags(Concepts.DYNAMIC_PROGRAMMING, Concepts.STRINGS),
            "dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1].",
            "If characters match, dp[i][j] = dp[i-1][j-1]. Otherwise, take min of insert, delete, replace.",
            "Base cases: dp[i][0] = i (delete all), dp[0][j] = j (insert all).",
            "O(m * n)"));

        questions.add(q("11", "Burst Balloons", Difficulty.HARD,
            "You are given n balloons with numbers on them. Bursting balloon i gives you nums[i-1] * nums[i] * nums[i+1] coins. Find the maximum coins you can collect by bursting all balloons.",
            tags(Concepts.DYNAMIC_PROGRAMMING, Concepts.BACKTRACKING),
            "Think about which balloon to burst LAST in a range, not first.",
            "dp[i][j] = max coins from bursting all balloons between i and j (exclusive).",
            "For each k in (i,j), try k as the last balloon: dp[i][j] = max(dp[i][k] + dp[k][j] + nums[i]*nums[k]*nums[j]).",
            "O(n^3)"));
    }

    // --- Helper methods ---

    private QuestionModel q(String id, String title, Difficulty difficulty,
                            String description, List<Concepts> concepts,
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

    private List<Concepts> tags(Concepts... values) {
        return Arrays.asList(values);
    }
}
