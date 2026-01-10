# Portfolio Website | Pemika Chongkwanyuen

A responsive, data-driven portfolio website designed to showcase academic achievements, work experience, and technical projects. This project uses a centralized JSON database to dynamically populate content, making it easy to maintain and update over the long term.

## 🚀 Features

* **Centralized Data Management**: All information is stored in `data.json`.
* **Dynamic Content**: JavaScript fetches data to populate the Experience timeline and Project grid.
* **Organized Assets**: Dedicated directory for all images and documents (CV).
* **CI/CD Ready**: Includes GitHub Actions workflow (`deploy.yml`) for automated deployment.
* **Responsive Design**: Optimized for desktop and mobile.

## 📂 Project Structure

```text
/
│
├── .github/workflows/
│   └── deploy.yml       # GitHub Actions configuration for auto-deployment
│
├── assets/              # Static assets (Icons, Images, PDF CV)
│   ├── icons/
│   ├── images/
│   └── PemikaChongkwanyuen_CV.pdf
│
├── pages/               # Secondary pages
│   ├── experience.html
│   └── projects.html
│
├── data.json            # The "Database" containing all info
├── index.html           # Main landing page
├── script.js            # Logic for fetching data & rendering
├── style.css            # Global styling
└── README.md            # Documentation
```

## ⚙️ How to Run
Because this website uses the JavaScript `fetch()` API to load `data.json`, it cannot be opened directly by double-clicking the HTML files (due to browser CORS policies). You must run it through a local server.

### Option A: VS Code (Recommended)
1. Open the project folder in **VS Code**.
2. Install the **Live Server** extension.
3. Right-click `index.html` and select **"Open with Live Server"**.

### Option B: Python
If you have Python installed, open your terminal/command prompt in the project folder and run:

```bash
# Python 3.x
python -m http.server
```
Then open your browser and go to `http://localhost:8000`.

## 📝 How to Customize

### 1. Updating Information
Open `data.json`. You can modify any field here.

* **Add a new Job**: Add a new object to the `experience` array.
* **Add organization logo**: For each item in the `experience` array you can add a `logo` field with the path to an image (recommended: `assets/icons/<logo-file>.png`). The site will use this to display the organization's logo next to the experience entry.
* **Add a new Project**: Add a new object to the `projects` array. Ensure the `category` matches one you want to filter by.

### 2. Changing Images
* **Profile Picture**: Replace the image file in your folder and update the `src` attribute in `index.html`.
* **Project Images**: Add your screenshots to an `assets/images` folder and update the `"image"` paths in `data.json` to point to them (e.g., `"asset/images/domacod-nsc.jpg"`).

## 📄 License

This project is open-source and available for personal use and modification.

---

**Author**: Pemika Chongkwanyuen