# CS06 Main
## Description
>

Project is a web service for the UoG School of Arts. It is a historical mapping tool focused on student collaboration.

---
## Installation
>

You'll need a mongodb account set up with a cluster to use it and a file called ".env" in the "backend" folder (this file is in gitignore so wont be pushed).

 
################################################################################
The ".env" file has to contain the following:
 
 
SESSION_SECRET=secret


MONGO_DB_CONNECTION= "connection link to your mongodb server"



FILE_UPLOAD_PATH= ./public/uploads


MAX_FILE_UPLOAD=1000000



JWT_SECRET=4674236742trgefghf7635fe


JWT_EXPIRE=30d


JWT_COOKIE_EXPIRE=30



SOCKET_URI=http://localhost:3000



SMTP_HOST=smtp.mailtrap.io


SMTP_PORT=2525


SMTP_EMAIL=791958ac674b3c


SMTP_PASSWORD=985ba8d6b3cb40


FROM_EMAIL=noreply@devcamper.io


FROM_NAME=DevCamper


################################################################################
 

Make sure Node.js is installed https://nodejs.org/en/download/

 
 

run both frontend and backend separately with command: npm run dev


 


To download dependencies, type "npm install" in both frontend and backend folders.


---
## Usage
>
---
## Authors and Acknowledgement
>
---
## License
>
---
