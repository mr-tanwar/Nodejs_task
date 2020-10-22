# nodejs_task

RequirementsTask 1
Making the first user who registers, as Admin.
● The code should be well structured
● Must have proper comments
● Should document the workflow and how to run the code
Description :
There should be two models Users and User_Roles.
First time when user registers, the User_Roles table should contain value as admin for that user and for rest of them
it should be different.

Steps to start the project.
1. Clone the project.
2. Run "npm install" command in backend folder this will install node modules.
3. Run the "npm start" command in terminal.
4. The server will be started on PORT 5000.

http://localhost:5000/api/users/register


1. Two schemas are used first is Users which take input - name, email, password, and creation date.
2. The second schema is user_roles, it takes email and role. Here email links both schema.
3. All inputs present in request body like name, email, password are validated first and errors are send as response acordingly.
4 when user send a request to register the first it is checked that the collection is empty or not is it is empty then new document will be created with user info in Users collection and in user_roles collection the user will be registered as an Admin.
5. If the collection is not empty then user details will be stored Users collection and in User_roles collection it will be stored as a normal user

