# Project Description for PixelTiler

### Project Goal

Development of a website where users can upload images and transform them into mosaics. Users have various customization options:

- **Image Upload**: Users can upload an image of any size.
- **Mosaic Size**: The height and width of the mosaic are given in millimeters, where 1px corresponds to one millimeter.
- **Material Selection**: Users can choose between glass, ceramic, or marble as the mosaic material. Each material type is assigned specific color palettes in the form of hex codes stored in a JSON file.
- **Tile Size and Spacing**: Users can adjust the size of the mosaic tiles and the spacing between them (only whole numbers allowed).
- **Mosaic Creation**: Based on the uploaded image and specified parameters, the image is transformed into a mosaic, where the hex codes of the tiles are matched as closely as possible to the corresponding image colors.
- **Result**: The finished mosaic is displayed on the website.

### Important Contents in the Requirements Document

- **Project Overview**: Brief description of what the program is supposed to do.
- **Target Audience**: Who will use the project (e.g., users creating art projects).
- **Technical Process**: How is the image transformed into a mosaic? (Steps from image upload to mosaic calculation).
- **Technologies**: Use HTML5, CSS3, JavaScript (pure), JSON, and Canvas.
- **Mosaic Configuration**: Size, spacing, material type, stone sizes, and how these data are used.
