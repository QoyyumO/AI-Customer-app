# AI-Customer Support

An intelligent customer support chatbot powered by Gen-AI technology, built with Next.js and Material-UI.

## Project Overview

This AI-Customer Support system aims to provide efficient and personalized customer service through an AI-powered chatbot. The project is developed in stages, progressively enhancing functionality from basic responses to advanced, personalized interactions.

## Features

- Chatbot interface for customer interactions
- Gen-AI powered responses (using Llama or Groq)
- User authentication and profile management (Firebase)
- Personalized chat experiences based on user data

## Tech Stack

- Frontend: Next.js, Material-UI (MUI)
- Backend: Next.js API routes
- AI Model: Llama or Groq
- Authentication: Firebase
- Database: Firebase Realtime Database or Firestore

## Development Roles

### Frontend Developer
- Set up the Next.js project structure
- Create the basic UI for the chatbot interface (MUI)
- Implement hard-coded responses (Level 1)

### Backend Developer
- Set up the backend API structure
- Integrate a Gen-AI model API (e.g., Llama or Groq) (Level 2)
- Create endpoints for chatbot interactions

### Full-stack Developer
- Implement Firebase user authentication (Bonus)
- Create user profile management
- Begin work on personalized chat experience

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/ai-customer-support.git
```
2. Install dependencies:
 ```bash
cd ai-customer-support
npm install
```
3. Set up environment variables:
Create a `.env.local` file in the root directory and add necessary API keys and configuration details.

4. Run the development server:
```bash
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contributing

We welcome contributions to the AI-Customer Support project. Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Material-UI for the sleek UI components
- Firebase for authentication and database services
- Llama/Groq for powering our AI model
