# 🏔️ Arunachal Explore | The Land of the Rising Sun

**Arunachal Explore** is a premium, AI-powered tourism platform designed to showcase the pristine beauty and rich cultural heritage of Arunachal Pradesh. Built with a cutting-edge tech stack, it provides a seamless end-to-end experience for travelers—from discovering hidden Himalayan gems to planning personalized itineraries and applying for entry permits.

---

## ✨ Key Features

### 🤖 AI-Powered Intelligence (Genkit)
*   **Personalized Itinerary Generator**: An advanced AI agent that crafts day-by-day travel plans based on user interests (culture, adventure, wildlife) and trip duration.
*   **Smart ILP Pre-Check**: An automated review tool that analyzes Inner Line Permit (ILP) applications for completeness and compliance with local regulations, reducing approval friction.

### 🌍 Multilingual Accessibility
*   Full support for **English**, **Hindi (हिंदी)**, **Bengali (বাংলা)**, and **Assamese (অসমীয়া)**.
*   Localized content and UI components ensure the platform is accessible to a diverse range of domestic and international travelers.

### 🏨 Travel & Logistics
*   **Curated Guides**: Detailed insights into Tawang, Ziro Valley, Namdapha National Park, and more.
*   **Premium Stays**: A handpicked collection of mountain resorts and eco-stays.
*   **Mountain-Ready Transport**: Booking options for 4x4 SUVs and Himalayan adventure bikes.
*   **Safety & Emergency**: A dedicated directory of 24/7 emergency contacts, hospitals, and police stations across all districts.

### 🎨 Modern User Experience
*   **Scroll-Reveal Animations**: Immersive UI transitions that bring the landscapes of Arunachal to life.
*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
*   **Dynamic Hero Carousel**: Visual storytelling through high-quality imagery and evocative taglines.

---

## 🛠️ Technical Architecture

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **UI/UX**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
*   **AI Orchestration**: [Genkit](https://firebase.google.dev/docs/genkit) (Google Gemini 2.0/2.5 Flash)
*   **State Management**: React Context & Hooks
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Form Handling**: React Hook Form + Zod validation

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 20+
*   Google AI Studio API Key (for Genkit features)

### Installation
1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure environment variables**:
    Create a `.env.local` file and add your keys:
    ```env
    GOOGLE_GENAI_API_KEY=your_gemini_api_key
    NEXT_PUBLIC_SITE_URL=http://localhost:9002
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```

---

## 🗺️ Project Structure

*   `/src/app`: Next.js App Router pages and layouts.
*   `/src/ai`: Genkit flows, prompts, and configuration.
*   `/src/components`: Reusable UI components and feature-specific blocks.
*   `/src/lib`: Utility functions, constants, and localization context.
*   `/src/hooks`: Custom React hooks for animations and state.

---

## 📜 License
This project is developed for the Arunachal Pradesh Tourism Department. All rights reserved.

---

**Arunachal Explore** — *Your gateway to the hidden paradise.*