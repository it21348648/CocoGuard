
# Deep Learning of Coconut Diseases and Fertility Check "CocoGuard"

## Team Members

 1. **Group Leader:** IT21348648- R. C Balasooriya
 2. **Member 1:** IT21193736- Adithya E.L.A.Y
 3. **Member 2:** IT21305696- Gunarathne M. M. S. U.
 4. **Member 3:** IT21296933- Silva T. C. D.

## Overview

Coconut cultivation is vital to Sri Lanka's economy, supporting rural livelihoods and contributing significantly to the agro-economy. However, challenges such as declining productivity, quality issues, and inefficient management practices impact profitability and sustainability. Existing methods often lack real-time data integration and advanced technologies to address these gaps effectively.

Our research introduces an innovative solution to enhance coconut cultivation through four components: disease detection and management, coconut quality enhancement, soil fertility management, and maturity and harvest prediction. Novel approaches, such as saliency mapping and explainable AI, improve early detection of gray leaf spot and other diseases. Super-resolution imaging refines disease identification, enabling timely interventions. Real-time NPK sensor data ensures precise soil fertility recommendations, while drone imagery and predictive analytics facilitate accurate maturity identification and efficient harvest planning.

By integrating real-time data, advanced imaging, and predictive models, our system offers a comprehensive approach to improving coconut plantation management. This dynamic solution bridges existing gaps, addressing productivity, quality, and resource optimization challenges, thereby fostering sustainable and profitable coconut farming in Sri Lanka.

## Problem Statement

Coconut cultivation is vital for tropical agriculture, but it faces significant challenges due to pests, diseases, and ineffective maturity identification, which negatively impact yield and quality. Farmers often struggle with accurately identifying coconut maturity stages and detecting diseases like gray leaf spots and whitefly infestations. Additionally, there is no efficient system for predicting optimal harvest dates based on fruit maturity and past harvest data, leaving farmers reliant on subjective assessments and inconsistent methods.

Our research addresses these challenges through an innovative solution integrating image processing and machine learning technologies. The primary objectives are to: (1) develop a model to classify coconut maturity stages (young, mature, old, or non-coconut) and predict optimal harvest times for maximum yield; and (2) train models to identify diseases such as gray leaf spots and mita attacks, enhancing disease management.

The project will culminate in a user-friendly mobile application where farmers can upload photos of coconut fruits or leaves, receive maturity, harvest, and disease-related insights, and contribute relevant data for model improvement. This solution aims to empower farmers with actionable information, boosting productivity and sustainability in coconut farming.

## Objectives

**R. C Balasooriya** 
Develop a comprehensive system for detecting and managing mite infestations in coconut plantations using advanced technologies such as drones, super-resolution imaging. The system aims to address farmers' challenges in inspecting tall coconut trees manually and managing pest infestations without requiring extensive external expertise. By accurately identifying mite attacks, the system will provide tailored treatment recommendations, enabling farmers to mitigate pest damage and enhance coconut yield efficiently.

**Gunarathne M. M. S. U**
Early Disease detection and management in coconut leaves utilizing technologies like deep learning and image processing, saliency mapping, XAI for real-time identification of diseases.

**Adithya E.L.A.Y**
The main objective of this study is to develop an integrated fertilization management system for coconut cultivation in Sri Lanka which will be cost effective and user friendly. The system will be a combination of IoT devices, supported with soil sensors (NPK sensor, pH sensor and humidity) and mobile application to provide live accurate fertilizer recommendations based on the real time continuous analysis to optimize productivity. It will help in increasing fertilizer use efficiency, improving soil health, productivity of coconut and also saves the financial and time which is spent on conventional methods.

**Silva T. C. D**
Maturity and harvest management in coconut farming using technologies like deep learning, image processing, and preductuve analysis for accurate prediction of fruit maturity and optimized harvesting practices.

## Specific Objectives

**Mite Attack Detection and Management: R. C Balasooriya**  

1. **Model Training:** Train machine learning models like CNNs, MLP Mixer using labeled images of mite attacks on coconut trees for accurate identification.  
2. **Choose Best Model:** Evaluate models (e.g., ResNet, MobileNet, EfficientNet) and select the most accurate and efficient one for mite attack detection.  
3. **Frontend Development:** Design a user-friendly mobile application for farmers to upload coconut images and receive real-time mite infestation diagnoses and solutions.  
4. **Novelty Integration:** Incorporate advanced features such as super-resolution imaging to enhance prediction accuracy.  
5. **Backend Development:** Develop a robust system to process uploaded images, integrate model predictions, and store data for continuous improvement and user support.  

**Leaf Disease Ditection: Gunarathne M. M. S. U**

1.	**Model Training:** Train machine learning models like CNNs using labeled images of coconut diseases for accurate classification.
2. **Choose Best Model:** Evaluate models (e.g., ResNet, MobileNet, NasNetMobile) and select the most accurate and efficient one for disease detection.
3. **Frontend Development:** Design a simple mobile app for users to upload images and get real-time disease diagnoses.
4. **Novelty Integration:** Add features and tools Saliency mapping and Explainable AI.
5. **Backend Development:** Build a system to handle image processing, model predictions, and data storage for seamless operation.

**IOt Based Fertilizer Recomondation: Adithya E.L.A.Y**

1. **Create an IOT device** Develop a compact and efficient Internet of Things (IoT) device integrated with a 7-in-1 NPK sensor to collect real-time data from the soil. The device will measure key parameters such as Nitrogen (N), Phosphorous (P), Potassium (K), pH, Temperature, and Moisture enabling precise monitoring for smart agriculture.
2. **Data Gathering** Implement a robust system to collect, store, and manage sensor data. The IoT device will transmit the data wirelessly to a centralized database or local device, ensuring accurate and continuous monitoring of soil health for agricultural optimization.
3. **Train a Model to give the solution** Utilize the gathered data to train a machine learning model capable of identifying patterns and predicting optimal agricultural practices. The model will analyze soil parameters and recommend actionable insights to enhance crop yield and efficiency.
4. **Create Mobile App** Design and develop a user-friendly mobile application to display the analyzed data and predictions from the trained model. The app will provide farmers with real-time insights, recommendations, and an interface to interact with the IoT device seamlessly.

**Maturity Ditection: Silva T. C. D**

1.	**Model Training:** Train machine learning models (e.g., CNNs) with labeled datasets of coconut images at different maturity stages to enable accurate classification and prediction of harvest readiness.
2.	**Choose Best Model:** Evaluate and select the most efficient models (e.g., EfficientNet, MobileNet, Restnet18) based on accuracy, speed, and resource efficiency for maturity detection.
3.	**Frontend Development:** Develop a mobile app where users can capture and upload images of coconuts to receive real-time feedback on maturity stage and harvest recommendations.
4.	**Novelty Integration:** Incorporate and use predictive analytics for harvest date period to get maximum yield 
5.	**Backend Development:** Build a robust backend system to process images, run model predictions, store data, and ensure smooth communication with the frontend for real-time operations.

## System Overview Diagram

![image alt](https://github.com/it21348648/CocoGuard/blob/a660b8e4a5b636030ee10325769126e46df0748e/System%20Diagram.png)

## Key Features

**Coconut Pest Detection: R.C Balasooriya**
Utilize super-resolution technology to enhance image quality, improving accuracy in identifying and managing mite infestations in coconut plantations.

**Leaf Disease Ditection: Gunarathne M. M. S. U**
Integrate saliency mapping and Explainable AI (XAI) to provide transparent disease identification and actionable insights for effective management.

**IOt Based Fertilizer Recomondation: Adithya E.L.A.Y**
Create a model for Giving the Fertilizer Recommendation to increase the soil fertility for Sri Lankan coconut farming

**Maturity Ditection: Silva T. C. D**
Leverage predictive analysis to determine coconut maturity stages and optimal harvest times, to get maximum yield and improving plantation efficiency.

## Git repository link

https://github.com/it21348648/CocoGuard.git