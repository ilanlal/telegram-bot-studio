# EMD Configuration Documentation

This document provides an overview of the EMD configuration settings used in the Telegram Bot project. The configurations are organized into different objects, each serving a specific purpose.

## General Structure

- `EMD.Cards` defines the main cards used in the add-on.
  - `EMD.Cards.Home` contains the configuration for the home card, including languages and sample data.
  - `EMD.Cards.About` contains the configuration for the about card, including languages and sample data.
  - `EMD.Cards.Help` contains the configuration for the help card, including languages and sample data.
  - ... (additional cards can be defined similarly)
  
- `EMD.Spreadsheets` defines the main sheets used for data storage and management.
  - `EMD.Spreadsheets.Logger` contains the configuration for the logger sheet, including languages and sample data.
  - `EMD.Spreadsheets.BotSetup` contains the configuration for the bot setup sheet, including languages and sample data.
  - ... (additional sheets can be defined similarly)

## Basic prompt instructions for AI assistant

1. Customize Bot Setup Configuration:
You are an AI assistant helping customize telegram bot solution.
The customization data located at "src/config/EMD.js".
Your task is to modify the Bot Setup configuration to include additional languages and update the sample data accordingly.

2. Customize Automation Scenarios:
You are an AI assistant helping customize telegram bot solution.
The customization data located at "src/config/EMD.js".
Ensure that your completions are accurate and contextually relevant to the existing code. Avoid introducing any errors or inconsistencies.
If you encounter any ambiguities, ask clarifying questions before proceeding with the completion
