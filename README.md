# Gathering Globe

An event management platform that empowers local and small artists with tools to create and manage events, sell tickets, and foster community engagement.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Event Creation and Management**: Artists can create events, manage event details, and monitor ticket sales.
- **Secure Payment Processing**: Integrated Stripe Payment Intents using TypeScript and Nodemailer to ensure seamless transactions and automatic order confirmations.
- **Live Chat Functionality**: Implemented real-time chat using Socket.io to enhance community interaction and engagement.
- **Live Streaming Capabilities**: Utilized Livekit and webhooks for live streaming, allowing organizers to broadcast events and interact with audiences in real-time using OBS.
- **Enhanced User Experience**:
  - **Location Search**: Integrated Google Maps API for easy event location search.
  - **QR Code Ticketing**: Provided QR code functionality for efficient ticketing and event access.
- **AI-Powered Chatbot**: Leveraged OpenAI GPT to implement an NLP chatbot that assists users with site navigation and answers relevant questions.

---

## Demo

[Live Demo](https://your-live-demo-link.com) _(Replace with actual link once available)_

---

## Installation

### Prerequisites

- **Node.js** and **npm** installed
- **MongoDB** instance
- **Stripe** account
- **OpenAI API** key
- **Google Maps API** key
- **Cloudinary** account
- **Livekit** server setup

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/gathering-globe.git
   cd gathering-globe/server
   ```
2. **Install the dependencies**: 
   ```bash
   npm install
   ```

