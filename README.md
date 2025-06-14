<p align="center">
  <img src="https://raw.githubusercontent.com/dharma0504/Act-Local/main/Actlocal.png" alt="ActLocal Logo" width=100%/>
</p>


# 🌍 ActLocal – Connect. Volunteer. Impact.

**ActLocal** is a platform designed to connect passionate individuals with local volunteering opportunities. Built with a modern tech stack, it enables communities to grow stronger through easy access to verified local events and causes.

---

## 🚀 Features

- 🔎 **Explore Local Opportunities**: Easily browse and filter volunteering events near your location.
- 📝 **Volunteer Registration**: Sign up for events with a single click.
- 📊 **Organizational Dashboard**: NGOs and organizers can post, edit, and manage events.
- 📅 **Upcoming Events Tracker**: Stay updated with real-time listings and availability.
- 💬 **Feedback & Review System** *(Planned)*: Help volunteers and organizers build credibility and trust.

---

## 🛠️ Tech Stack

### 💻 Frontend
- ⚛️ [React.js](https://reactjs.org/)
- ⚡ [Vite](https://vitejs.dev/) – for fast builds and optimized performance
- 🎨 [Tailwind CSS](https://tailwindcss.com/)

### 🔧 Backend
- 🔌 [JSON Server](https://github.com/typicode/json-server) – for RESTful API mocking
- 🗂️ `db.json` – Simulates event listings and user data

---

## 📁 Project Structure

```
ActLocal/
├── backend/
│   └── db.json
└── local-volunteering/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        └── components/
```



---

## 💡 Future Enhancements

- Add user authentication (JWT-based login/signup)
- Volunteer history & leaderboard
- Email/SMS reminders for registered users
- Map integration for location-based filtering

---



## 🧑‍💻 Local Development

### Prerequisites
- Node.js installed
- `json-server` globally or locally installed

### Setup

```bash
# 1. Backend - Run fake API server
cd backend
npx json-server --watch db.json --port 5000

# 2. Frontend - Start React app
cd ../local-volunteering
npm install
npm run dev

```

## 👨‍💻 Created By

**Dharmatej Mallampati**

Connect with me:  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&style=for-the-badge)](https://www.linkedin.com/in/dharmatej-mallampati-47944724a/)


