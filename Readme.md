# Electricity Distribution System in India

Build using _NodeJS, Express Framework, Bootstrap v4.0, MySQL Database , HTML and CSS_ for **"My Database Management Course Project"**.

**Language Used**: JavaScript, SQL, and Markup Language.  

## To Run This in Your Local Computer
- Clone/Download the repository
- Open the directory in the terminal.
- Run the command _npm install_ . This will install the required dependencies
- Run _node index.js_ . This will start the server at **localhost:8080**

## Functionalities Present
### Landing Page
![Landing-Page](demoSnapshots/LandingPage.png)

- From here _consumer_ can login and check about his profile and electricity bill details.  
- A new _consumer_ can apply for new connection and if already applied then he can check for the status.  
- On Clicking for Apply connection first Selecting of some information will be taking place and then the form will be displayed.  

### Appy New Connection
![Selecting-For-New-Connection](demoSnapshots/newConnection.png)
- On filling the above form this connection form will appear. And on Successfull Submission Reference Id will be shown.

![New-Connection-Form](demoSnapshots/newconForm.png) 

### Reference Id
- And this reference Id will also be mailed to the user with other details. This I am doing with the help of _Nodemailer_ npm package which is using TCP protocol for sending the message.

![Refid](demoSnapshots/refid.png) 

- The demo mail which has been sent to the user. 

![Mail](demoSnapshots/mail.png)

### Application Status
- This will take email id and reference id as input and show whether the form is accepted or not.

![Application-Status](demoSnapshots/status.png)


### Electricity Board List
- In the same way Power Company, Distribution Company and Transmission Company list will be displayed to the general user such as consumer.
- This is the simple list page for people to see that which are the board list are available in there country, where they are etc.

![Electricity-List](demoSnapshots/view.png)
- The search bar will help to search for Name in particular state.
- This data can't be tampered by the common people.
- When the authorized staff will login he/she can update the details/ delete any company which is shut down/ or add any new company.

![Editable-List](demoSnapshots/edit.png)

## Logged In User Profile and Bill Information Page.
- All the address of the user will also be shown here.

![Profile](demoSnapshots/profile.png)
- If particular consumer has more homes then bill for every address will bill shown to him/her with particular meter id.

![Bill](demoSnapshots/bill.png)

This Same Project has been Replicated using Python for Desktop Application by my Group Members: [Code](https://github.com/PraveenKumarRana/DBMS-Project-Desktop-App)


**Hope that You will Enjoy our Project.**    
_Happy Coding._