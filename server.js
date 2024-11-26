const express = require('express'); // Import Express
const logger = require('morgan'); // Import Morgan for logging
const path = require('path'); // Import Path module for handling file paths

const server = express(); // Create an Express app instance

// Middleware
server.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
server.use(logger('dev')); // Use Morgan for logging

// Serve static files from the 'public' directory
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// POST Route for Mad Lib
server.post('/ITC505/lab-7/index.html', (req, res) => {
  console.log(req.body);
  const { singularNoun, pluralNoun, descriptiveAdjective, actionVerb, place } = req.body;

  if (!singularNoun || !pluralNoun || !descriptiveAdjective || !actionVerb || !place) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mad Lib Error</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
            background-color: #f8d7da;
            color: #721c24;
          }
          h1 {
            font-size: 2rem;
          }
          p {
            margin: 20px 0;
          }
          a {
            color: #0056b3;
            text-decoration: none;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>Submission Failed</h1>
        <p>Please fill out ALL fields</p>
        <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
      </body>
      </html>
    `);
    return;
  }

  const madLib = `In a distant ${place}, a ${descriptiveAdjective} ${singularNoun} set off on a daring quest to ${actionVerb}. 
As it ventured through the wild terrain, a band of mischievous ${pluralNoun} appeared, eager to join the journey!`;


  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Mad Lib</title>
      <style>
  /* General Styles */
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    padding: 40px;
    background: linear-gradient(135deg, #f8f9fa, #e2e6ea);
    color: #495057;
    text-align: center;
    line-height: 1.6;
  }

  h1 {
    font-size: 3rem;
    font-weight: 600;
    color: #343a40;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.25rem;
    margin: 20px 0;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    color: #6c757d;
  }

  a {
    display: inline-block;
    margin-top: 30px;
    padding: 12px 30px;
    font-size: 1.1rem;
    font-weight: 500;
    color: #fff;
    background-color: #007BFF;
    text-decoration: none;
    border-radius: 30px;
    transition: background-color 0.3s, transform 0.3s ease;
  }

  a:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  a:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(38, 143, 255, 0.5);
  }

  /* Container */
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    body {
      padding: 20px;
    }

    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.1rem;
    }

    a {
      padding: 10px 25px;
      font-size: 1rem;
    }
  }
</style>

    </head>
    <body>
      <h1>Your Mad Lib!</h1>
      <p>${madLib}</p>
      <a href="/ITC505/lab-7/index.html">Create Another Mad Lib</a>
    </body>
    </html>
  `);
});

// Start the server
let port = 80; // Default port
if (process.argv[2] === 'local') {
  port = 8080; // Use port 8080 for local development
}
server.listen(port, () => console.log(`Ready on localhost:${port}`));