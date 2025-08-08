# 🩺 Doctors Listing Frontend (Next.js)

This is the frontend for the Doctors Search & Listing app.  
It’s built with **Next.js** and is fully responsive.

---

## 🚀 Features
- Search doctors by **name, specialty, location**
- Doctor listing page with **filters & sorting**
- Responsive design for mobile and desktop
- Integrated with backend API for live data

---

## 🛠️ Tech Stack
- **Next.js** (React Framework)
- **Tailwind CSS** (Styling)
- **Radix UI** (Accessible UI components)
- **Axios** (API calls)

---

## 📦 Installation

1. Clone the repository:
```bash
git clone `https://github.com/dev-chandan-pandey/health-seeker-hub/tree/main/health-seeker-hub-main`
cd frontend

2. Install dependencies:

`npm install
`

3. Create .env.local file:
`NEXT_PUBLIC_API_URL=http://localhost:5000`

4. Run development server:
`npm run dev
`

5. Open:
`http://localhost:3000`

📂 Project Structure
csharp
Copy
Edit

```
frontend/
  ├── components/        # UI Components
  ├── pages/             # Next.js Pages
  ├── styles/            # Tailwind Styles
  ├── public/            # Static Files
  ├── utils/             # API Helpers

```

🔗 API Endpoints Used
`GET /api/doctors` → Get all doctors

`GET /api/doctors?`specialty=...&location=... → Filter doctors




---
📸 UI Preview
(Include screenshot of home page and listing page here)

🧑‍💻 Author
Your Name

## **`README-backend.md`**
```markdown
# 🩺 Doctors Listing Backend (Node.js + Express + MongoDB)

This is the backend API for the Doctors Search & Listing app.  
It provides endpoints to fetch, filter, and manage doctor data.

---

## 🚀 Features
- REST API for doctors listing
- MongoDB database with Mongoose models
- CORS enabled for frontend communication
- Seed script for sample data

---

## 🛠️ Tech Stack
- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **dotenv** (Environment variables)
- **cors** (Cross-Origin Resource Sharing)

---

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-backend-repo-url>
cd backend

```

Install dependencies:
`npm install
`

Create .env file:
`PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/healthseeker
`
Run development server:
`npm run dev
`

Seed database with sample data:
`node seed.js
`


```
backend/
  ├── models/           # Mongoose Schemas
  ├── routes/           # API Routes
  ├── controllers/      # Request Handlers
  ├── seed.js           # Seed Database Script
  ├── server.js         # App Entry Point

```

🔗 API Endpoints
Doctors
GET /api/doctors → Get all doctors

GET /api/doctors?specialty=...&location=... → Filter doctors

POST /api/doctors → Add new doctor


🧪 Example GET Request
bash
Copy
Edit
curl "http://localhost:5000/api/doctors?specialty=Dermatology&location=Bangalore"



🔍 Example Search
After seeding the database with the provided dummy data, you can test the search functionality:

Specialization:
`Cardiologist`
Location:

`Bangalore`
Expected Result:
You should see at least one doctor matching:

Specialization: `Cardiologist`

Location:` Bangalore`

Example:

`
{
  "name": "Dr. Arjun Mehta",
  "specialization": "Cardiologist",
  "location": "Bangalore",
  "clinicName": "HeartCare Clinic",
  "experience": 15,
  "consultationFee": 600,
  "rating": 95,
  "availability": "Available Today"
}
`
