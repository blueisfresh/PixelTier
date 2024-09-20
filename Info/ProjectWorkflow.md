# Project Workflow for PixelTiler

## 1. Project Planning & Requirements

- **Define exactly what the project must be able to do** (e.g., upload images, create mosaics).
- **Create an overview of requirements and constraints** (e.g., only whole numbers for tile sizes).

### Important Contents for the Requirements Document:

- **Project Description**: Short summary of the project.
- **Functionalities**: What the user can do (e.g., upload images, adjust mosaics).
- **Technical Requirements**: Which technologies you will use (HTML, CSS, JavaScript, JSON, Canvas).
- **JSON Usage**: Explanation of how the project accesses the data.
- **User Interface**: Sketch or description of the forms and their functionality.
- **Mosaic Process Flow**: How the image is processed and the mosaic is created.

## 2. Create the Basic Structure of the Website (HTML + CSS)

- Set up the HTML form and position it centrally with rounded edges.
- **CSS**: Use Flexbox or Grid to center the form.
- Add input fields for image upload, mosaic size, gap, and tile choice.

## 3. Understand Canvas & Image Processing

- Learn how Canvas works and how you process the uploaded image.
- Use Canvas to load the image and analyze the pixel color values.

## 4. Integrate JSON Data

- **Learn how to read JSON in JavaScript**.
- Best ways to read JSON:
  - **fetch API**: The modern and best way.
  - **Direct Embedding**: Only for static JSON data.
  - **XMLHttpRequest**: The older, but still usable way.

## 5. Mosaic Calculation and Display

- Process the image with the selected mosaic parameters.
- Replace areas of the image with mosaic tiles matching the hex codes from the JSON based on the closest color match.

## 6. Review and Adjust

- Test the entire project.
- Optimize performance and layout.

---

### Important Contents in the Requirements Document

- **Project Overview**:
  - Brief description of what the program should do.
- **Target Audience**:
  - Who will use the project (e.g., users creating art projects).
- **Technical Process**:
  - How is the image transformed into a mosaic? (Steps from image upload to mosaic calculation).
- **Technologies**:
  - Use HTML5, CSS3, JavaScript (pure), JSON, and Canvas.
- **Mosaic Configuration**:
  - Size, spacing, material type, stone sizes, and how these data are used.
