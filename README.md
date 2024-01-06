# CONCORD

### Overview
Put simply, this project replicates the functionality of Discord, incorporating various features found in the original application. The user interface is constructed using React, Material UI, HTML, CSS, and JavaScript. For the backend, Firebase is employed, specifically utilizing Firestore for real-time database functionality and Authentication through OAuth.

##### Frontend 
**React**,**HTML**,**CSS**,**Material UI**,**JavaScript**
##### Database
**Google FireStore**
##### Authentication
**Google Authentication Services**


### Features

1. **Create Servers:**
   - **Description:** Users have the ability to create their own servers with ease. The process involves providing a server name and an image to personalize the server.
   - **Implementation:** Upon user input, the server details are stored in the database, creating a unique space for users to communicate.

2. **Join Servers:**
   - **Description:** Users can join existing servers, gaining access to all associated channels and messages within those servers.
   - **Implementation:** Users can explore and join servers by using the serverID provided to them, enabling them to engage in conversations and collaborations.

3. **Invite User to Join Server:**
   - **Description:** Users have the ability to invite others to join their server by providing the unique serverID.
   - **Implementation:** The invite system facilitates user recruitment, allowing for an expansion of the server community.

4. **Real-Time Messaging:**
   - **Description:** Communication within channels is instantaneous, supporting real-time updates for text messages.
   - **Implementation:** Utilizing technologies like Firebase Realtime Database, messages are instantly relayed to all users within the channel, promoting seamless communication.

5. **User-Specific Channels and Servers:**
   - **Description:** Users have visibility only into the channels and servers they are part of, ensuring a personalized and clutter-free experience.
   - **Implementation:** User-specific data filtering is applied, allowing users to access and interact with only the servers and channels relevant to them.

6. **Google Sign-In (OAuth):**
   - **Description:** Users authenticate themselves by signing in with their Google accounts, ensuring a secure and streamlined login process.
   - **Implementation:** OAuth is employed to leverage Google's authentication services, providing a secure and user-friendly sign-in experience.

7. **User Name Search:**
   - **Description:** Users can search for others based on their usernames, facilitating easy discovery and connection.
   - **Implementation:** A search feature allows users to find and connect with others by entering the username, enhancing user engagement.

8. **People List:**
   - **Description:** Each server displays a list of all users associated with it, providing transparency about the server's community.
   - **Implementation:** The people list is dynamically updated, allowing users to view the members of the server and fostering a sense of community.

These features collectively contribute to creating a collaborative and user-friendly environment, allowing users to effectively communicate and connect within the server-based platform.

### Getting Started

To get started with **Concord**, follow these simple steps:
1. Clone the repository.
```git clone https://github.com/your-username/your-repo.git```
2. Install dependencies.
```cd concord```
```npm install```
3. Run the application
```npm start```

### Usage

Users can use this project to communicate with friends, join communities and share messages.

### Acknowledgements

_Clever Progammer(youtuber)_


