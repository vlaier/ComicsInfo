# XKCD Comics

This is an Expo React Native project that fetches and displays XKCD comics in a list. Clicking on an item from the list will take you to a details screen where you can view all the details about the comic.

## Installation

To run this application locally, you will need to have Node.js installed on your system. Once you have verified that you have Node.js installed, you can follow these steps:

1. Clone the repository to your local machine using the command `git clone https://github.com/vlaier/ComicsInfo.git`
2. Navigate to the project directory using `cd ComicsInfo`
3. Install all the required dependencies using `npm install`
4. Start the application using `npm start`

## Dependencies

This project uses the following dependencies:

- [React Navigation](https://reactnavigation.org/docs/getting-started) for navigation between screens
- [React Query](https://react-query.tanstack.com/) for fetching and caching data

## How to Use

When you first launch the app, you will see a list of the latest XKCD comics. Scroll down to see morecomics. The list uses infinite loading, meaning that more comics will be loaded automatically as you reach the end of the current list.

Clicking on an item from the list will take you to the details screen for that particular comic. On the details screen, you can view the comic's image, title, number, and publication date.

## Credits

This project uses data from the [XKCD API](https://xkcd.com/json.html). All the comics displayed in this application are property of XKCD.
