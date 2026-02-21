export type QuestionDifficulty = "Easy" | "Medium" | "Hard";

export type SessionQuestion = {
  id: string;
  title: string;
  difficulty: QuestionDifficulty;
  statement: string;
  examples: { title: string; body: string }[];
  starterCode: string;
  language: string;
};

/** Mock questions for the session. In a full app these would come from the backend based on selected path. */
export const MOCK_SESSION_QUESTIONS: SessionQuestion[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    statement: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        title: "Example 1:",
        body: "Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        title: "Example 2:",
        body: "Input: nums = [3, 2, 4], target = 6\nOutput: [1, 2]",
      },
    ],
    starterCode: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
    language: "python",
  },
  {
    id: "2",
    title: "Add Two Numbers",
    difficulty: "Medium",
    statement: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      {
        title: "Example 1:",
        body: "Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.",
      },
    ],
    starterCode: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Your code here
        pass`,
    language: "python",
  },
];
