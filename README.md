# Qualification Times Plugin for WordPress

This plugin is a simple yet effective tool for rendering and displaying agility qualification times and event details on your WordPress site. 
Built with **React**, **Vite**, and **CSS**, it provides an easy-to-use interface for showcasing event information like start/end dates, qualification times, locations, and referees.

## Features

- **Displays Qualification Times**: Shows detailed information about agility qualification events including qualification times, event dates, location, and referee.
- **Filter by Year**: Users can filter events by year for easy navigation.
- **Responsive Design**: Fully responsive and styled with custom CSS.
- **Built with React & Vite**: A modern approach using React and Vite for fast, dynamic rendering.

## Installation

### Manually Install the Plugin

1. Download the plugin files.
2. Upload the plugin directory to the `/wp-content/plugins/` directory on your WordPress server.
3. Go to your WordPress dashboard, navigate to **Plugins** → **Installed Plugins**, and activate the plugin.

## Usage

Once activated, you can add the plugin's functionality to any page or post by using the following shortcode:

```text
[qual_times]
```

## Changes

### 1. Changes to WordPress Theme Custom CSS
To improve the layout of the Qualification Times plugin, custom CSS was added:
```css
/* Adjust paragraph spacing for qualification times page */
.single-content p {
  margin-bottom: 1rem;
}
