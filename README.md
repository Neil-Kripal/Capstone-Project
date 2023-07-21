# Capstone Project - ExpenseWise

## Expense Wise - Expense Tracking and Budget Management Application

Expense Wise is a desktop application designed to address the need for users to efficiently track their expenses, manage expense categories, set budgets, and work towards their savings goals. The application provides an intuitive and user-friendly interface to help users gain better control over their finances while ensuring privacy. With Expense Wise, users can log their expenses, categorize them, set budget limits, create savings goals, and monitor their financial progress through visual representations.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [User Classes and Characteristics](#user-classes-and-characteristics)
- [Requirements](#requirements)
  - [External Interfaces](#external-interfaces)
  - [Functional Requirements](#functional-requirements)
  - [Non-Functional Requirements](#non-functional-requirements)
- [Documentation](#documentation)
  - [Problem Statement](#problem-statement)
  - [Industry/Domain](#industrydomain)
  - [Stakeholders](#stakeholders)
  - [Product Description](#product-description)
  - [User Stories](#user-stories)
  - [User Flow](#user-flow)
  - [Wireframe Design](#wireframe-design)
  - [Open Questions/Out of Scope](#open-questionsout-of-scope)
- [Project Planning](#project-planning)
- [Testing Strategy](#testing-strategy)
- [Implementation](#implementation)
- [Deployment Considerations](#deployment-considerations)
- [References](#references)

## Introduction
Expense Wise is a software application that enables users to efficiently track their expenses, manage expense categories, set budgets, and work towards their savings goals. The application features a client-server architecture with a web-based user interface for users to interact with the application.

## Features
Expense Wise offers the following key features:
- User registration and login: Users can create accounts and log into the application to access their personal expense data securely.
- Expense input: Users can enter their expenses, providing details such as the date, amount, description, and category for better expense tracking.
- Expense categorization: Users can categorize their expenses into predefined or custom categories, allowing for organized and insightful expense analysis.
- Savings Goals: Users can create savings goals with specific amounts and due dates, enabling them to plan for future expenses and financial milestones. They can also invite others to contribute to the goal for collaborative savings tracking.
- Budgeting: Users can set budget limits for different expense categories and receive notifications when they exceed the defined budget limits.
- Visual Representation: The home page includes a pie chart and calendar that displays all user inputs in an easy-to-read format, providing visual insights into their expenses and progress towards goals.

## User Classes and Characteristics
- Regular Users: Individuals who register and utilize the application for personal expense tracking and budget management.
- Administrators: System administrators responsible for managing user accounts and application settings.

## Requirements

### External Interfaces
#### User Interface
The user interface should be web-based and provide the following functionalities:
- User registration and login screens
- Expense input form
- Category selection and category creation form options
- Saving goal creation and ability to add funds to the goal
- Reports and analytics display through the dashboard, including a pie chart and calendar
- Budget limits

#### APIs
The APIs are within the Server-side code that communicates with MongoDB to retrieve and post data.

### Functional Requirements
#### User Authentication
- Users should be able to register accounts with unique usernames and passwords.
- Users should be able to log into the application using their credentials.

#### Expense Management
- Users should be able to add new expenses, providing details such as date, amount, description, and category.
- Users should be able to view and update existing expenses.
- Users should be able to delete expenses if needed.

#### Expense Categorization
- Users should be able to assign expenses to predefined or custom categories.
- Users should be able to create, update, and delete custom categories.

#### Budgeting
- Users should be able to set budget limits for different expense categories.
- Users should receive notifications when they exceed the defined budget limits.
- Users should be able to set reminders for recurring expenses and receive notifications accordingly.

#### Saving Goals
- Users should be able to create savings goals with total amounts, due dates, and invite others to contribute to the goal.
- Users should be able to add funds to their savings goals whenever they like.

### Non-Functional Requirements
- Performance: The application should respond quickly to user actions, even with a large amount of expense data.
- Security: User data should be securely stored and transmitted, and user authentication should be implemented securely.
- Usability: The user interface should be intuitive, visually appealing, and easy to navigate.
- Reliability: The application should handle errors gracefully and ensure data integrity.
- Display: Displaying all data on the front page should be efficient and present in an organized manner.

## Documentation

### Problem Statement
Managing personal finances can be challenging, and people often struggle to keep track of their expenses and savings. Expense Wise aims to provide a centralized and easy-to-use expense tracking solution to empower users to make informed financial decisions. The application is designed for individuals, financial institutions, and companies seeking a comprehensive, user-friendly expense tracking and budget management application.

### Industry/Domain
Expense Wise aligns with the broader financial technology (FinTech) industry, catering to the growing demand for innovative financial services that facilitate efficient expense tracking and budget management.

### Stakeholders
- Individual Users: Individuals seeking to manage their expenses and savings effectively.
- Financial Institutions: Companies that want to track expenses effectively, such as cashback or accounting firms.
- Companies: Companies with expenses that need an easy-to-use and cost-effective expense tracking solution.

### Product Description
Expense Wise is designed as a desktop application with a client-server architecture and a web-based user interface. It offers a seamless end-to-end solution to help users manage their expenses, categorize them, set budget limits, and work towards their savings goals. The application's intuitive user interface and robust functionalities make it suitable for users from various backgrounds, including those with limited technical knowledge.

### User Stories
Expense Wise's user stories include features such as expense tracking, budget management, savings goals, user authentication, data encryption, and a user-friendly and comprehensive UI.

### User Flow
The user flow outlines how users will navigate through the application to accomplish various tasks, from expense input to budgeting and savings goals management.

### Wireframe Design
The wireframe design provides visual representations of the application's user interface, ensuring a user-friendly and intuitive design.

### Open Questions/Out of Scope
The open questions and out-of-scope items highlight areas that require further consideration and potential future enhancements, such as mobile optimization, collaboration features, linking to banking details, and data encryption and security measures.

## Project Planning
Project planning is tracked using GitHub issues and milestones, allowing for efficient task management and progress tracking.

## Testing Strategy
The testing strategy encompasses unit testing, integration testing, and end-to-end testing to ensure the application's functionality and robustness. Test cases will cover various scenarios, including edge cases and boundary conditions.

## Implementation
Expense Wise will be deployed as a desktop application compatible with major operating systems, providing a seamless user experience.

## Deployment Considerations
The application will be deployed as a desktop application and hosted on online servers, providing users with easy access and high availability.

## References
- GitHub – Expense Wise Capstone Project: [https://github.com/Neil-Kripal/Capstone-Project](https://github.com/Neil-Kripal/Capstone-Project)
- Node.js: [https://nodejs.org/](https://nodejs.org/)
- Bootstrap: [https://getbootstrap.com/](https://getbootstrap.com/)
- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)

---
This README provides an overview of the Expense Wise application, its features, requirements, documentation, and other important details. For more detailed information and project resources, please refer to the provided references and GitHub repository.
