# Address Book Application

A modern web application to manage and view user details with a responsive design:
http://nuvalenceproject.s3-website.us-east-2.amazonaws.com/

## 🚀 Deployment / Running Instructions (Mac)

### 1. Prerequisites:
   - Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
   - Install [Angular CLI](https://angular.io/guide/setup-local) globally:
     ```bash
     npm install -g @angular/cli
     ```

### 2. Clone the repository:
```bash
    git clone https://github.com/LeeDJohnson/address-book-challenge
    cd address-book-challenge
```

### 3.  Install dependencies:
```bash
npm install
```

### 4.  Run the application:
```bash
npm start
```

### 5. Run Jest tests:
```bash
npm test
```

### 5. Run Cypress tests:
First, ensure application is running, then:
```bash
npx cypress open
```


📝 Summary of the Assignment
Overall Approach:
At the outset of this project, I focused on laying a robust foundation by configuring a tailored Angular application for the Address Book solution.

Component Configuration:
Two core components, namely UserList and UserDetail, formed the backbone of the user interface. The UserList component was crafted to provide an interactive list of users, while the UserDetail component was designed to showcase individual user details upon selection.

State Management with NgRx:
I recognized the significance of efficient state management, especially for applications like Address Book where user interactions need to be captured and reflected promptly. For this reason, I chose NgRx – a predictable state container designed for Angular applications. This ensured that user selections, transitions between lists and details, and other user-driven actions were seamlessly managed.

Backend Communication:
To maintain a streamlined connection with our backend, I integrated a service dedicated to fetching user data from the designated API. This service acted as a bridge, ensuring that our front-end components had access to accurate and up-to-date data, enhancing the user experience.

Testing – The Pillar of Reliability:
To ensure the application's integrity and robustness, I adopted a two-pronged testing approach:

Unit Testing with Jest: Components, services, reducers, and selectors were meticulously tested using Jest. This provided confidence in the modular functionality of the application, ensuring each piece of the puzzle functioned as intended.
End-to-End Testing with Cypress: Going beyond unit tests, I implemented end-to-end tests using Cypress. This simulated real-world user interactions, ensuring that the entire application flow, from initial load to individual user detail navigation, operated smoothly.
This comprehensive approach not only ensured a functional and reliable application but also paved the way for future enhancements and scalability.

🎉 Implemented Features:

1. Dynamic User List View with Pagination:
The application dynamically fetches and displays a user list, presenting ten individuals from the address book at a time. Pagination is seamlessly integrated, allowing users to easily navigate through various pages and discover more users without the clutter of a long list.

2. In-depth User Detail View:
For a comprehensive understanding of a particular user, one can click on any individual from the list. This action leads to a detailed view page, showcasing rich information such as their first name, last name, and phone number.

3. State Management using ngrx:
The application utilizes ngrx for state management, ensuring a seamless and efficient user experience. This provides a predictable state container, enhancing data flow throughout the application and simplifying the management, tracking, and debugging of state-related issues.

4. Lazy Loading for Enhanced Performance:
The application has incorporated lazy loading techniques, ensuring that components and data are loaded on-demand, reducing initial load times and enhancing the user experience.

5. Adaptive Image Optimization:
To ensure a seamless experience across various screen sizes, the application dynamically serves optimized images based on the monitor size. This not only enhances the visual appeal but also reduces data consumption and load times.

6. Mobile-First Responsive Design:
Designed with a mobile-first approach, the application adjusts gracefully across a myriad of screen sizes. Whether accessed from a smartphone, tablet, or desktop, it offers an intuitive and user-friendly interface.

7. Engaging Animations:
The application uses animations to enhance the user experience. These animations make the user interface more appealing and offer visual feedback, making interactions feel more natural.

8. Comprehensive Screen Reader Support:
Understanding the importance of inclusivity, the application has been developed with screen reader support. This ensures that users with visual impairments can navigate and interact with the application effectively, fostering a more inclusive user environment.


⏭ Future Improvements:

Search Functionality:
   - Deep Search: Allow users to search by any part of the name or other user attributes.
   - Auto-suggestions: Provide dynamic suggestions as users type, based on the existing database.

Sort Options:
   - Multiple Criteria: Introduce sorting based on various fields, like phone numbers or other user attributes.

Enhanced Styling and Theming:
   - Customizable Themes: Offer a range of themes or color schemes, including a dark mode.

Notifications and Alerts:
   - Implement real-time notifications or alerts for specific user-related events or updates.
User Feedback System:
   - Allow users to provide feedback, report issues, or suggest enhancements directly within the application.

User Profiles and Authentication:
   - If applicable, introduce user profiles and authentication mechanisms for personalized experiences and data security.

Localization and Internationalization:
   - Adapt the application to support multiple languages and regional preferences, catering to a global user base.

Integration with Other Systems or Platforms:
   - Explore potential integrations with other applications or platforms, broadening the application's functionality and reach.