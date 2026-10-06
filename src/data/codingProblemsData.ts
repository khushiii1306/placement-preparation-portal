export interface CodingProblem {
  id: string;
  number: number;
  title: string;
  difficulty: 'Easy' | 'Medium';
  topic: 'Arrays' | 'Strings' | 'Searching' | 'Sorting' | 'Basic Programming';
  shortDescription: string;
  statement: string;
  inputFormat: string;
  outputFormat: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  expectedApproach: {
    intuition: string;
    timeComplexity: string;
    spaceComplexity: string;
  };
  referenceSolutions: {
    cpp: string;
    python: string;
    java: string;
    javascript: string;
  };
}

export const codingProblemsList: CodingProblem[] = [
  {
    id: 'prob-1',
    number: 1,
    title: 'Reverse a Number',
    difficulty: 'Easy',
    topic: 'Basic Programming',
    shortDescription: 'Given an integer N, write a program to reverse its digits.',
    statement:
      'Given a 32-bit signed integer N, reverse its digits. If reversing N causes the value to go outside the signed 32-bit integer range [-2³¹, 2³¹ - 1], return 0.',
    inputFormat: 'A single integer N.',
    outputFormat: 'Return the reversed integer. If overflow occurs, return 0.',
    examples: [
      {
        input: 'N = 12345',
        output: '54321',
        explanation: 'Extract each digit using modulo 10 and build the reversed number.',
      },
      {
        input: 'N = -456',
        output: '-654',
        explanation: 'The sign is preserved while the digits 456 are reversed to 654.',
      },
      {
        input: 'N = 120',
        output: '21',
        explanation: 'Leading zeros in the reversed number are omitted.',
      },
    ],
    constraints: ['-2³¹ <= N <= 2³¹ - 1'],
    expectedApproach: {
      intuition:
        'Repeatedly pop the last digit of N using modulo operator (N % 10), multiply the accumulated result by 10, and add the popped digit. Divide N by 10 until it becomes 0.',
      timeComplexity: 'O(log₁₀ N) — number of digits in N',
      spaceComplexity: 'O(1) — constant auxiliary space',
    },
    referenceSolutions: {
      cpp: `int reverseNumber(int n) {
    long long rev = 0;
    while (n != 0) {
        int rem = n % 10;
        rev = rev * 10 + rem;
        n /= 10;
    }
    if (rev > INT_MAX || rev < INT_MIN) return 0;
    return (int)rev;
}`,
      python: `def reverse_number(n: int) -> int:
    sign = -1 if n < 0 else 1
    n_abs = abs(n)
    rev = 0
    while n_abs > 0:
        rev = rev * 10 + (n_abs % 10)
        n_abs //= 10
    rev *= sign
    if rev < -2**31 or rev > 2**31 - 1:
        return 0
    return rev`,
      java: `public class Solution {
    public int reverseNumber(int n) {
        long rev = 0;
        while (n != 0) {
            rev = rev * 10 + (n % 10);
            n /= 10;
        }
        if (rev > Integer.MAX_VALUE || rev < Integer.MIN_VALUE) return 0;
        return (int) rev;
    }
}`,
      javascript: `function reverseNumber(n) {
    let rev = 0;
    const sign = n < 0 ? -1 : 1;
    let temp = Math.abs(n);
    while (temp > 0) {
        rev = rev * 10 + (temp % 10);
        temp = Math.floor(temp / 10);
    }
    rev *= sign;
    if (rev < -(2**31) || rev > 2**31 - 1) return 0;
    return rev;
}`,
    },
  },
  {
    id: 'prob-2',
    number: 2,
    title: 'Check Palindrome',
    difficulty: 'Easy',
    topic: 'Strings',
    shortDescription: 'Determine if a given string or number reads the same forwards and backwards.',
    statement:
      'Given a string S consisting of alphanumeric characters, check whether it is a palindrome. Ignore case sensitivity and non-alphanumeric characters if evaluating phrases.',
    inputFormat: 'A string S.',
    outputFormat: 'Return true if S is a palindrome, false otherwise.',
    examples: [
      {
        input: 'S = "racecar"',
        output: 'true',
        explanation: '"racecar" spelled backwards is still "racecar".',
      },
      {
        input: 'S = "placement"',
        output: 'false',
        explanation: 'Backwards spelling is "tnemecalp", which differs from original.',
      },
    ],
    constraints: ['1 <= S.length <= 10⁵'],
    expectedApproach: {
      intuition:
        'Use the two-pointer technique: place one pointer at the start (left) and one at the end (right). Compare characters while moving towards the center. If any mismatch occurs, return false.',
      timeComplexity: 'O(N) — single pass of length N',
      spaceComplexity: 'O(1) — in-place pointers',
    },
    referenceSolutions: {
      cpp: `bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++;
        right--;
    }
    return true;
}`,
      python: `def is_palindrome(s: str) -> bool:
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`,
      java: `public class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,
      javascript: `function isPalindrome(s) {
    let clean = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let left = 0, right = clean.length - 1;
    while (left < right) {
        if (clean[left] !== clean[right]) return false;
        left++;
        right--;
    }
    return true;
}`,
    },
  },
  {
    id: 'prob-3',
    number: 3,
    title: 'Check Prime Number',
    difficulty: 'Easy',
    topic: 'Basic Programming',
    shortDescription: 'Given an integer N, check whether N is a prime number or not.',
    statement:
      'Given an integer N (N > 1), determine if N is a prime number. A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers.',
    inputFormat: 'A positive integer N.',
    outputFormat: 'Return true if N is prime, false otherwise.',
    examples: [
      {
        input: 'N = 29',
        output: 'true',
        explanation: '29 has no divisors other than 1 and 29.',
      },
      {
        input: 'N = 49',
        output: 'false',
        explanation: '49 is divisible by 7 (7 × 7 = 49).',
      },
    ],
    constraints: ['1 <= N <= 10⁹'],
    expectedApproach: {
      intuition:
        'If N has a factor greater than √N, it must also have a corresponding factor smaller than √N. Hence, check divisibility only up to √N, skipping even numbers after checking 2.',
      timeComplexity: 'O(√N) — optimal primality test',
      spaceComplexity: 'O(1) — constant space',
    },
    referenceSolutions: {
      cpp: `bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }
    return true;
}`,
      python: `def is_prime(n: int) -> bool:
    if n <= 1: return False
    if n <= 3: return True
    if n % 2 == 0 or n % 3 == 0: return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True`,
      java: `public class Solution {
    public boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }
}`,
      javascript: `function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}`,
    },
  },
  {
    id: 'prob-4',
    number: 4,
    title: 'Factorial of a Number',
    difficulty: 'Easy',
    topic: 'Basic Programming',
    shortDescription: 'Calculate the factorial of a non-negative integer N.',
    statement:
      'Given an integer N, compute N! = N × (N - 1) × (N - 2) × ... × 1. By definition, 0! = 1.',
    inputFormat: 'A non-negative integer N.',
    outputFormat: 'Return the factorial of N.',
    examples: [
      {
        input: 'N = 5',
        output: '120',
        explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120.',
      },
      {
        input: 'N = 0',
        output: '1',
        explanation: '0! is defined as 1.',
      },
    ],
    constraints: ['0 <= N <= 20 (to fit in 64-bit integer)'],
    expectedApproach: {
      intuition:
        'Iterate from 1 to N, multiplying each integer with a running product accumulator variable.',
      timeComplexity: 'O(N) — single linear loop',
      spaceComplexity: 'O(1) — iterative constant space',
    },
    referenceSolutions: {
      cpp: `long long factorial(int n) {
    long long ans = 1;
    for (int i = 2; i <= n; i++) {
        ans *= i;
    }
    return ans;
}`,
      python: `def factorial(n: int) -> int:
    ans = 1
    for i in range(2, n + 1):
        ans *= i
    return ans`,
      java: `public class Solution {
    public long factorial(int n) {
        long ans = 1;
        for (int i = 2; i <= n; i++) {
            ans *= i;
        }
        return ans;
    }
}`,
      javascript: `function factorial(n) {
    let ans = 1n;
    for (let i = 2n; i <= BigInt(n); i++) {
        ans *= i;
    }
    return ans.toString();
}`,
    },
  },
  {
    id: 'prob-5',
    number: 5,
    title: 'Sum of Digits',
    difficulty: 'Easy',
    topic: 'Basic Programming',
    shortDescription: 'Calculate the sum of all digits of a given positive integer N.',
    statement:
      'Given a positive integer N, find the sum of all its constituent decimal digits.',
    inputFormat: 'A positive integer N.',
    outputFormat: 'Return the sum of digits of N.',
    examples: [
      {
        input: 'N = 687',
        output: '21',
        explanation: '6 + 8 + 7 = 21.',
      },
      {
        input: 'N = 1004',
        output: '5',
        explanation: '1 + 0 + 0 + 4 = 5.',
      },
    ],
    constraints: ['1 <= N <= 10¹⁸'],
    expectedApproach: {
      intuition:
        'Extract the least significant digit using modulo 10 (N % 10), add it to the running sum, and drop that digit using integer division by 10 (N / 10).',
      timeComplexity: 'O(log₁₀ N) — number of digits',
      spaceComplexity: 'O(1) — constant space',
    },
    referenceSolutions: {
      cpp: `long long sumOfDigits(long long n) {
    long long sum = 0;
    while (n > 0) {
        sum += (n % 10);
        n /= 10;
    }
    return sum;
}`,
      python: `def sum_of_digits(n: int) -> int:
    return sum(int(d) for d in str(n))`,
      java: `public class Solution {
    public long sumOfDigits(long n) {
        long sum = 0;
        while (n > 0) {
            sum += (n % 10);
            n /= 10;
        }
        return sum;
    }
}`,
      javascript: `function sumOfDigits(n) {
    let sum = 0;
    while (n > 0) {
        sum += n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}`,
    },
  },
  {
    id: 'prob-6',
    number: 6,
    title: 'Find Largest Element in Array',
    difficulty: 'Easy',
    topic: 'Arrays',
    shortDescription: 'Traverse an array of numbers and return the maximum element.',
    statement:
      'Given an array arr of N integers, find and return the largest element present in the array.',
    inputFormat: 'An array of integers arr of length N.',
    outputFormat: 'Return the maximum integer in the array.',
    examples: [
      {
        input: 'arr = [3, 7, 2, 9, 5]',
        output: '9',
        explanation: 'Among the elements, 9 is the highest value.',
      },
      {
        input: 'arr = [-10, -3, -50, -2]',
        output: '-2',
        explanation: '-2 is the highest value among all negative integers.',
      },
    ],
    constraints: ['1 <= arr.length <= 10⁵', '-10⁹ <= arr[i] <= 10⁹'],
    expectedApproach: {
      intuition:
        'Initialize max_val with the first element of the array. Iterate through each subsequent element; if current element is greater than max_val, update max_val.',
      timeComplexity: 'O(N) — single linear traversal',
      spaceComplexity: 'O(1) — in-place comparison',
    },
    referenceSolutions: {
      cpp: `int findLargest(vector<int>& arr) {
    int maxVal = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}`,
      python: `def find_largest(arr: list[int]) -> int:
    max_val = arr[0]
    for x in arr[1:]:
        if x > max_val:
            max_val = x
    return max_val`,
      java: `public class Solution {
    public int findLargest(int[] arr) {
        int maxVal = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > maxVal) {
                maxVal = arr[i];
            }
        }
        return maxVal;
    }
}`,
      javascript: `function findLargest(arr) {
    let maxVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}`,
    },
  },
  {
    id: 'prob-7',
    number: 7,
    title: 'Linear Search',
    difficulty: 'Easy',
    topic: 'Searching',
    shortDescription: 'Search for target element in an unsorted array and return its index.',
    statement:
      'Given an array arr of N integers and an integer target, return the 0-based index of target if present. If target is not found in the array, return -1.',
    inputFormat: 'An array arr of length N and target integer K.',
    outputFormat: 'Return the index of target or -1.',
    examples: [
      {
        input: 'arr = [10, 50, 30, 70, 80, 60], target = 70',
        output: '3',
        explanation: 'Element 70 is found at index 3.',
      },
      {
        input: 'arr = [4, 9, 12, 18], target = 25',
        output: '-1',
        explanation: '25 is not present in the array.',
      },
    ],
    constraints: ['1 <= arr.length <= 10⁵', '-10⁹ <= arr[i], target <= 10⁹'],
    expectedApproach: {
      intuition:
        'Inspect each element sequentially from index 0 to N-1. If arr[i] == target, return index i immediately. If loop finishes without a match, return -1.',
      timeComplexity: 'O(N) — best case O(1), worst case O(N)',
      spaceComplexity: 'O(1) — constant space',
    },
    referenceSolutions: {
      cpp: `int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      python: `def linear_search(arr: list[int], target: int) -> int:
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1`,
      java: `public class Solution {
    public int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}`,
      javascript: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}`,
    },
  },
  {
    id: 'prob-8',
    number: 8,
    title: 'Bubble Sort',
    difficulty: 'Medium',
    topic: 'Sorting',
    shortDescription: 'Sort an array in non-decreasing order using the Bubble Sort algorithm.',
    statement:
      'Given an array arr of N integers, sort the array in ascending order using the Bubble Sort algorithm. In each pass, repeatedly swap adjacent elements if they are in the wrong order.',
    inputFormat: 'An array arr of integers.',
    outputFormat: 'Return the sorted array in non-decreasing order.',
    examples: [
      {
        input: 'arr = [64, 34, 25, 12, 22, 11, 90]',
        output: '[11, 12, 22, 25, 34, 64, 90]',
        explanation: 'Largest elements "bubble" to the end with each consecutive pass.',
      },
      {
        input: 'arr = [5, 1, 4, 2, 8]',
        output: '[1, 2, 4, 5, 8]',
        explanation: 'Sorted using adjacent swaps.',
      },
    ],
    constraints: ['1 <= arr.length <= 1000', '-10⁴ <= arr[i] <= 10⁴'],
    expectedApproach: {
      intuition:
        'Run an outer loop for N-1 passes. In each pass, compare adjacent pairs (arr[j], arr[j+1]) and swap if arr[j] > arr[j+1]. Optimize by adding a swapped boolean flag to break early if no swaps occurred.',
      timeComplexity: 'O(N²) worst/average case, O(N) best case with swapped flag',
      spaceComplexity: 'O(1) — in-place sorting',
    },
    referenceSolutions: {
      cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      python: `def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
      java: `public class Solution {
    public void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}`,
      javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}`,
    },
  },
];
