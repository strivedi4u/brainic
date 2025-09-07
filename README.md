
[![Live Demo](https://img.shields.io/badge/Live%20Demo-brainic.azurewebsites.net-blue?style=for-the-badge)](https://brainic.azurewebsites.net)

# Brainic 🧠

## 🚀 Overview

Brainic is an advanced AI-powered platform that integrates multiple generative AI models (ChatGPT, Google PaLM, Bard, DALL·E, and Google Image Search) to deliver intelligent chat, image generation, and search capabilities. Designed for seamless user experience, Brainic leverages modern web technologies and cloud deployment for scalability and performance.

---

## 🌐 Live URL

🔗 [brainic.azurewebsites.net](https://brainic.azurewebsites.net)

---

## 📊 Project Presentation

Get a quick, visual overview of the project’s goals, features, and design.

<a href="https://www.canva.com/design/DAFW9z9vPkE/geTuSZ4Yj9UiXgMNC8MCtQ/view?utm_content=DAFW9z9vPkE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7b2bb999db" target="_blank">
  <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/canva_logo_icon_168460.png" alt="Canva Logo" width="16" style="vertical-align:middle; margin-right:6px;"/>
  <b>View the Presentation on Canva</b>
</a>

---

### 📖 Presentation Contents

- **Project Overview & Vision**
- **Key Features & Benefits**
- **Tech Stack**
- **Architecture & Diagrams**
- **Screenshots**
- **Contact & Author Info**

---

> [Click here to open the Canva presentation directly.](https://www.canva.com/design/DAFW9z9vPkE/geTuSZ4Yj9UiXgMNC8MCtQ/view?utm_content=DAFW9z9vPkE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7b2bb999db)

---

**Feedback and collaboration are always welcome!**

## 🏗️ Project Structure

```
Branic/
│   index.js                # Backend server (Express, API integrations)
│   package.json            # Backend dependencies
│   test.js                 # Bard API test server
└───frontend/
		│   package.json        # Frontend dependencies
		│   README.md           # Frontend documentation
		├───build/              # Production build (React)
		├───public/             # Static assets (HTML, icons, manifest)
		└───src/                # Source code
				│   App.js          # Main React component
				│   index.js        # Entry point
				│   assets/         # CSS & images
				│   components/     # Reusable UI components
				│   pages/          # Page-level components
```

---

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js, Axios
- **Frontend:** React.js, CSS
- **AI Integrations:**
	- OpenAI (ChatGPT, DALL·E)
	- Google PaLM
	- Bard
	- Google Custom Search (Image Search)
- **Cloud:** Azure Web Apps
- **Other:** Body-parser, CORS

---

## 🔄 Data Flow & Architecture

### 1️⃣ User Interaction
- Users interact via the web UI (React frontend).

### 2️⃣ API Requests
- Frontend sends requests to backend endpoints:
	- `/gpt-1` → ChatGPT
	- `/gpt-2` → Google PaLM
	- `/gpt-3` → Bard
	- `/generate-image` → DALL·E image generation
	- `/search-image` → Google Image Search

### 3️⃣ Backend Processing
- Backend routes requests to respective AI APIs.
- Handles authentication, request formatting, and error management.

### 4️⃣ Response Delivery
- Backend sends AI-generated responses/images back to frontend.
- Frontend displays results in a user-friendly format.

### 5️⃣ Static Hosting
- Production React build served via Express static middleware.

---

## 📸 Screenshots


![Home Page](https://github.com/strivedi4u/brainic/blob/master/frontend/image.png)
![Help Interface](https://github.com/strivedi4u/brainic/blob/master/image.png)


---

## 📦 Installation & Development

### Backend
```bash
npm install
node index.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 📝 License

See [LICENSE](../LICENSE) for details.

---

## 🤝 Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas.

---

## 📬 Contact

For support or inquiries, reach out via [Live Site](https://brainic.azurewebsites.net).

---

## 💡 Features

- Multi-model AI chat (GPT, PaLM, Bard)
- AI-powered image generation
- Google image search
- Modern, responsive UI
- Cloud deployment (Azure)

---

## 🧩 Future Improvements

- User authentication
- Conversation history
- More AI models
- Enhanced UI/UX

---

## 🏆 Credits

- OpenAI
- Google AI
- Azure
- React
