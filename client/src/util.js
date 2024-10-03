export const apiUrl =
  import.meta.env.MODE == "development"
    ? "http://localhost:8000"
    : "https://job-app-u25w.onrender.com";
