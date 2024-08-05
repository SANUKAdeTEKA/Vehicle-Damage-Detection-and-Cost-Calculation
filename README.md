# Vehicle Damage Detection and Cost Estimation System

## Introduction

This project aims to develop an automated system for detecting vehicle damage from images and estimating the repair cost based on the type of damage and vehicle details. The system leverages a pre-trained YOLO machine learning model for damage classification and a web application for user interaction.

## Objectives

- Detect vehicle damage from images.
- Classify the damage into six categories: crack, dent, glass shatter, lamp broken, scratch, or tire flat.
- Estimate repair costs based on vehicle brand, model, and make year.

## System Architecture

### Components

- **Machine Learning Model**: Pre-trained YOLO model developed using Python on Anaconda.
- **Backend API**: Flask API built using Python to interface with the model.
- **Frontend**: Developed using Vue.js and Tailwind CSS.
- **Backend Framework**: Laravel for handling database operations and business logic.
- **Database**: SQL database to store vehicle details and repair costs.

### Data Flow

1. User uploads an image and inputs vehicle details on the frontend.
2. The image and details are sent to the backend API.
3. The API processes the image through the machine learning model to classify the damage.
4. The damage type and vehicle details are used to fetch repair cost information from the database.
5. The system generates a detailed report and displays it on the website.

## Inputs and Outputs

### Inputs

- **Image of the Vehicle**: Uploaded by the user.
- **Vehicle Details**:
  - Brand
  - Model
  - Make Year

### Outputs

- **Damage Type**: One or more of the six categories (crack, dent, glass shatter, lamp broken, scratch, tire flat).
- **Repair Cost Report**: Detailed cost estimation based on damage type and vehicle details.

## Implementation Details

### Machine Learning Model

- **Development Environment**: Anaconda
- **Pretrained Model**: YOLO
- **Language**: Python
- **Functionality**: Image classification to detect type of damage.
- **Inputs**: Image of the vehicle.
- **Outputs**: Damage type.

### Backend API

- **Framework**: Flask (Python)
- **Functionality**:
  - Accept image and vehicle details from frontend.
  - Process image through the ML model.
  - Communicate with Laravel backend to fetch repair costs.
- **Endpoints**:
  - `/upload`: Accepts image and vehicle details, returns damage type and cost estimate.

### Frontend

- **Framework**: Vue.js
- **Styling**: Tailwind CSS
- **Functionality**:
  - User interface for image upload and vehicle detail input.
  - Display of damage detection results and cost estimation report.

### Backend (Laravel)

- **Functionality**:
  - Manage vehicle and damage data.
  - Interface with SQL database to retrieve repair costs.
  - Provide data to the API for cost estimation.
- **Endpoints**:
  - `/get-costs`: Retrieves repair costs based on vehicle details and damage type.

### Database

- **Type**: SQL
- **Tables**:
  - `vehicles`: Stores vehicle brand, model, and make year.
  - `damages`: Stores types of damages.
  - `repair_costs`: Stores cost estimates for different damages based on vehicle details.

## User Interface

### Image Upload and Vehicle Details Form

- Input fields for:
  - Vehicle image (file upload)
  - Brand (input)
  - Model (input)
  - Make Year (input)

### Damage Detection Results

- Display the detected damage type.
- Display the estimated repair cost.

## System Workflow

1. **User Interaction**:
   - User uploads the image and fills in vehicle details.
   - Submits the form.

2. **Backend Processing**:
   - API receives the image and details.
   - Image is processed by the ML model to detect damage.
   - Damage type and vehicle details are used to fetch cost from the database.

3. **Frontend Display**:
   - User receives a detailed report with the damage type and estimated repair cost.

