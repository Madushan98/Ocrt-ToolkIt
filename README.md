# OCR Toolkit

A software application that utilizes Optical Character Recognition (OCR) technology to recognize text and add advanced pre-processing techniques to extract text from images with high accuracy. Our tool employs techniques such as skewing, rotating, and noise cancelling to enhance images before performing OCR, resulting in reliable and precise text extraction.

## Features

- Fast and accurate OCR processing
- User-friendly interface
- Convert scanned PDFs into searchable and editable documents
- Supports multiple languages
- Ability to batch process multiple PDFs at once

## Getting Started

These instructions will help you set up the OCR Based PDF Reader on your local machine for development and testing purposes.

### Prerequisites

- [Python 3.x](https://www.python.org/downloads/)
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)

### Installation

1. Clone the repository:
  
2. Install the dependencies:
run the requriment.txt file in the backend 
``` 
pip install requirment.txt 
```
install dependencies in frontend
```
npm install 
```
3. Run the application:
- backend
```
uvicorn main:app --reload
```
- frontend 
```
    npm run dev
    # or
    yarn dev 
```



## Contributing

We welcome contributions to this project. If you have an idea for a feature or a bug fix, please open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
