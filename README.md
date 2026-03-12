# Exam Image Resizer

A simple web tool that helps students **resize images exactly according to government exam requirements**.
Just upload your photo, select the exam, and the tool automatically resizes the image to the **correct dimensions, format, and file size** required by the form.

This project focuses on solving a very common problem faced while filling government exam forms where uploads fail because the **image size or resolution does not match the requirement**.

---

## ✨ Features

- 📤 Upload image directly from your device
- 🧾 Select the **government exam**
- 🖼 Select **image type** (Photo / Signature / Thumb impression)
- ⚡ Automatic resizing to **exact required dimensions**
- 📦 File size compression to match exam limits
- 👀 Live preview of resized image
- ⬇️ Instant download
- 🔧 Modular configuration to add new exams without changing resizing logic

---

## 🧠 Core Idea

Each exam has different requirements like:

- Photo width & height
- File size limits
- Image format

Instead of hardcoding logic for each exam, this project uses a **configuration-based approach**.

New exams can be added by simply updating a configuration file.

Example:

```ts
export const exams = {
  SSC_CGL: {
    name: 'SSC CGL',
    images: {
      photo: {
        width: 200,
        height: 230,
        minSizeKB: 20,
        maxSizeKB: 50,
        format: 'jpeg',
      },
      signature: {
        width: 140,
        height: 60,
        minSizeKB: 10,
        maxSizeKB: 20,
        format: 'jpeg',
      },
    },
  },
};
```

No resizing logic needs to be rewritten.

---

## 🏗 Tech Stack

- **Vite** — frontend build tool
- **React** — UI framework
- **TypeScript** — type safety
- **Tailwind CSS** — styling
- **shadcn/ui** — UI components
- **Canvas API** — browser-native image processing (resize, crop, compress)

---

## 📁 Project Structure

```
src
 ├── components
 │   ├── UploadBox.tsx
 │   ├── ExamSelector.tsx
 │   ├── ImageTypeSelector.tsx
 │   ├── PreviewPanel.tsx
 │   └── NavLink.tsx
 │
 ├── config
 │   └── exams.ts
 │
 ├── lib
 │   ├── imageProcessor.ts
 │   └── utils.ts
 │
 ├── hooks
 │   ├── use-toast.ts
 │   └── use-mobile.tsx
 │
 ├── types
 │   └── exam.ts
 │
 ├── pages
 │   ├── Index.tsx
 │   └── NotFound.tsx
 │
 └── main.tsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/exam-resizer.git
cd exam-resizer
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

The app will run on `http://localhost:5173`

---

## ➕ Adding a New Exam

To add support for a new government exam:

1. Open `src/config/exams.ts`

2. Add a new configuration object

Example:

```ts
IBPS_PO: {
  name: "IBPS PO",
  images: {
    photo: {
      width: 200,
      height: 230,
      minSizeKB: 20,
      maxSizeKB: 50,
      format: "jpeg"
    }
  }
}
```

That's it.
The UI and resizing logic will automatically support the new exam.

---

## 🚀 Deployment

This project can be easily deployed on:

- **Vercel**
- **Netlify**
- **Cloudflare Pages**
- **GitHub Pages**

Build the project:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 🔒 Privacy

- Images are processed locally in the browser.
- No images are stored permanently.
- No uploads are saved on the server.

---

## 🛠 Future Improvements

- Bulk image resize for cyber cafés
- Automatic exam requirement detection
- Drag-and-drop cropping tool
- Chrome extension for form filling
- AI-based compression optimization

---

## ⭐ Why This Project Exists

Every year **millions of students struggle with rejected uploads** while filling government forms because of incorrect image sizes.

This project aims to make **government exam form filling faster, easier, and frustration-free**.
