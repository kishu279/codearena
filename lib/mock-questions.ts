import type { CodingQuestion } from "@/lib/types";

const questions: CodingQuestion[] = [
  {
    id: "123",
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Exactly one valid answer exists.",
    ],
    samples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] == 9",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    starterCode: {
      javascript:
        "function twoSum(nums, target) {\n  const seen = new Map();\n\n  for (let i = 0; i < nums.length; i += 1) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) {\n      return [seen.get(complement), i];\n    }\n    seen.set(nums[i], i);\n  }\n\n  return [];\n}\n",
      typescript:
        "function twoSum(nums: number[], target: number): number[] {\n  const seen = new Map<number, number>();\n\n  for (let i = 0; i < nums.length; i += 1) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) {\n      return [seen.get(complement)!, i];\n    }\n    seen.set(nums[i], i);\n  }\n\n  return [];\n}\n",
      python:
        "def two_sum(nums: list[int], target: int) -> list[int]:\n    seen: dict[int, int] = {}\n\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n\n    return []\n",
      java: "import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (seen.containsKey(complement)) {\n                return new int[] { seen.get(complement), i };\n            }\n            seen.put(nums[i], i);\n        }\n\n        return new int[] {};\n    }\n}\n",
      cpp: "#include <unordered_map>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n\n        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {\n            int complement = target - nums[i];\n            if (seen.find(complement) != seen.end()) {\n                return {seen[complement], i};\n            }\n            seen[nums[i]] = i;\n        }\n\n        return {};\n    }\n};\n",
    },
  },
  {
    id: "456",
    title: "Valid Parentheses",
    difficulty: "Easy",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1) Open brackets are closed by the same type of brackets.\n2) Open brackets are closed in the correct order.\n3) Every close bracket has a corresponding open bracket.",
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only: ()[]{}",
    ],
    samples: [
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    testCases: [
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
      { input: 's = "([)]"', output: "false" },
    ],
    starterCode: {
      javascript:
        "function isValid(s) {\n  const stack = [];\n  const pairs = {\n    ')': '(',\n    ']': '[',\n    '}': '{',\n  };\n\n  for (const char of s) {\n    if (!pairs[char]) {\n      stack.push(char);\n      continue;\n    }\n\n    if (stack.pop() !== pairs[char]) {\n      return false;\n    }\n  }\n\n  return stack.length === 0;\n}\n",
      typescript:
        "function isValid(s: string): boolean {\n  const stack: string[] = [];\n  const pairs: Record<string, string> = {\n    ')': '(',\n    ']': '[',\n    '}': '{',\n  };\n\n  for (const char of s) {\n    if (!pairs[char]) {\n      stack.push(char);\n      continue;\n    }\n\n    if (stack.pop() !== pairs[char]) {\n      return false;\n    }\n  }\n\n  return stack.length === 0;\n}\n",
      python:
        'def is_valid(s: str) -> bool:\n    stack: list[str] = []\n    pairs = {")": "(", "]": "[", "}": "{"}\n\n    for char in s:\n        if char not in pairs:\n            stack.append(char)\n            continue\n\n        if not stack or stack.pop() != pairs[char]:\n            return False\n\n    return len(stack) == 0\n',
      java: "import java.util.*;\n\nclass Solution {\n    public boolean isValid(String s) {\n        Deque<Character> stack = new ArrayDeque<>();\n        Map<Character, Character> pairs = new HashMap<>();\n        pairs.put(')', '(');\n        pairs.put(']', '[');\n        pairs.put('}', '{');\n\n        for (char ch : s.toCharArray()) {\n            if (!pairs.containsKey(ch)) {\n                stack.push(ch);\n                continue;\n            }\n\n            if (stack.isEmpty() || stack.pop() != pairs.get(ch)) {\n                return false;\n            }\n        }\n\n        return stack.isEmpty();\n    }\n}\n",
      cpp: "#include <stack>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};\n\n        for (char ch : s) {\n            if (pairs.find(ch) == pairs.end()) {\n                st.push(ch);\n                continue;\n            }\n\n            if (st.empty() || st.top() != pairs[ch]) {\n                return false;\n            }\n            st.pop();\n        }\n\n        return st.empty();\n    }\n};\n",
    },
  },
  {
    id: "789",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.\n\nA substring is a contiguous sequence of characters within the string.",
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    samples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with length 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
      },
    ],
    testCases: [
      { input: 's = "abcabcbb"', output: "3" },
      { input: 's = "bbbbb"', output: "1" },
      { input: 's = "pwwkew"', output: "3" },
    ],
    starterCode: {
      javascript:
        "function lengthOfLongestSubstring(s) {\n  let left = 0;\n  let best = 0;\n  const seen = new Map();\n\n  for (let right = 0; right < s.length; right += 1) {\n    const char = s[right];\n    if (seen.has(char) && seen.get(char) >= left) {\n      left = seen.get(char) + 1;\n    }\n\n    seen.set(char, right);\n    best = Math.max(best, right - left + 1);\n  }\n\n  return best;\n}\n",
      typescript:
        "function lengthOfLongestSubstring(s: string): number {\n  let left = 0;\n  let best = 0;\n  const seen = new Map<string, number>();\n\n  for (let right = 0; right < s.length; right += 1) {\n    const char = s[right];\n    if (seen.has(char) && seen.get(char)! >= left) {\n      left = seen.get(char)! + 1;\n    }\n\n    seen.set(char, right);\n    best = Math.max(best, right - left + 1);\n  }\n\n  return best;\n}\n",
      python:
        "def length_of_longest_substring(s: str) -> int:\n    left = 0\n    best = 0\n    seen: dict[str, int] = {}\n\n    for right, char in enumerate(s):\n        if char in seen and seen[char] >= left:\n            left = seen[char] + 1\n\n        seen[char] = right\n        best = max(best, right - left + 1)\n\n    return best\n",
      java: "import java.util.*;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> seen = new HashMap<>();\n        int left = 0;\n        int best = 0;\n\n        for (int right = 0; right < s.length(); right++) {\n            char ch = s.charAt(right);\n            if (seen.containsKey(ch) && seen.get(ch) >= left) {\n                left = seen.get(ch) + 1;\n            }\n\n            seen.put(ch, right);\n            best = Math.max(best, right - left + 1);\n        }\n\n        return best;\n    }\n}\n",
      cpp: "#include <string>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_map<char, int> seen;\n        int left = 0;\n        int best = 0;\n\n        for (int right = 0; right < static_cast<int>(s.size()); ++right) {\n            if (seen.find(s[right]) != seen.end() && seen[s[right]] >= left) {\n                left = seen[s[right]] + 1;\n            }\n\n            seen[s[right]] = right;\n            best = max(best, right - left + 1);\n        }\n\n        return best;\n    }\n};\n",
    },
  },
];

export function getQuestionById(questionId: string) {
  return questions.find((question) => question.id === questionId);
}
