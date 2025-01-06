package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type Question struct {
	QuestionText string
	Options      [4]string
	CorrectIndex int
}

var questionBank = []Question{
	{
		QuestionText: "Who is India Prime Minister?",
		Options:      [4]string{"1. Modi", "2. Dhoni", "3. Madrid", "4. Rome"},
		CorrectIndex: 0,
	},
	{
		QuestionText: "What is 50 + 30?",
		Options:      [4]string{"1. 6", "2. 7", "80", "4. 9"},
		CorrectIndex: 2,
	},
	{
		QuestionText: "Which programming language is known for data science?",
		Options:      [4]string{"1. Python", "2. JavaScript", "3. C++", "4. Java"},
		CorrectIndex: 1,
	},
}

func takeQuiz() (int, error) {
	scanner := bufio.NewScanner(os.Stdin)
	score := 0
	questionLimit := 30 * time.Second

	for i, question := range questionBank {
		fmt.Printf("Question %d: %s\n", i+1, question.QuestionText)
		for _, option := range question.Options {
			fmt.Println(option)
		}

		fmt.Printf("Enter the option number (1-4) or type 'exit' to quit: ")
		answerCh := make(chan string)
		go func() {
			if scanner.Scan() {
				answerCh <- scanner.Text()
			}
		}()

		timeLimit := time.After(questionLimit)
		select {
		case answer := <-answerCh:
			if strings.ToLower(answer) == "exit" {
				fmt.Println("Exiting the quiz...")
				return score, nil
			}
			selectedOption, err := strconv.Atoi(answer)
			if err != nil || selectedOption < 1 || selectedOption > 4 {
				fmt.Println("Invalid input. Please enter a number between 1 and 4.")
				continue
			}
			if selectedOption-1 == question.CorrectIndex {
				fmt.Println("Correct!")
				score++
			} else {
				fmt.Println("Incorrect.")
			}
		case <-timeLimit:
			fmt.Println("Time's up for this question! Moving to the next.")
		}
	}

	return score, nil
}

func classifyPerformance(score int, totalQuestions int) string {
	percentage := (float64(score) / float64(totalQuestions)) * 100
	switch {
	case percentage >= 80:
		return "Excellent"
	case percentage >= 50:
		return "Good"
	default:
		return "Needs Improvement"
	}
}

func main() {
	fmt.Println("Welcome to the Online Examination System!")
	fmt.Println("You will have 30 seconds per question to answer.")
	score, err := takeQuiz()
	if err != nil {
		fmt.Println("Error during quiz:", err)
		return
	}
	totalQuestions := len(questionBank)
	fmt.Printf("\nQuiz Completed!\nYour Score: %d/%d\n", score, totalQuestions)
	performance := classifyPerformance(score, totalQuestions)
	fmt.Printf("Performance: %s\n", performance)
}
