<?php
/*
Plugin Name: Agility Qual times
Version: 1.0
Author: Mikk
*/

// No direct access
defined('ABSPATH') or die('No script kiddies please!');

function agility_qual_times_scripts() {
    // Enqueue the calendar script only if the calendar shortcode is present on the page
    if (is_singular() && has_shortcode(get_post()->post_content, 'qual_times')) {

        // Construct the path to the manifest file (file system path)
        $manifest_file = plugin_dir_path(__FILE__) . 'dist/.vite/manifest.json';

        // Check if the manifest file exists
        if (file_exists($manifest_file)) {
            // Decode the JSON content of the asset manifest file
            $manifest = json_decode(file_get_contents($manifest_file), true);

            // Check if the 'index.html' entry exists in the manifest
            if (isset($manifest['index.html'])) {
                // Get the JS file path from the manifest
                $js_file = $manifest['index.html']['file'] ?? null;

                // Enqueue the React app JS if it exists
                if ($js_file) {
                    wp_enqueue_script(
                        'qual-times-js',
                        plugin_dir_url(__FILE__) . 'dist/' . $js_file, // Dynamically get JS file path
                        array(), // No dependencies
                        null, // No version (the file name includes the hash)
                        true // Load in the footer
                    );
                }

                // Get the CSS files from the manifest and loop through them
                $css_files = $manifest['index.html']['css'] ?? [];
                foreach ($css_files as $css_file) {
                    wp_enqueue_style(
                        'qual-times-css-' . md5($css_file), // Unique handle for each CSS file
                        plugin_dir_url(__FILE__) . 'dist/' . $css_file, // Dynamically get CSS file path
                        array(), // No dependencies
                        null // No version (the file name includes the hash)
                    );
                }
            }
        } else {
            error_log('Manifest file not found at: ' . $manifest_file);
        }
    }
}

add_action('wp_enqueue_scripts', 'agility_qual_times_scripts');

function qual_times_shortcode() {
    return '<div id="agility_qual_times"></div>';
}

add_shortcode('qual_times', 'qual_times_shortcode');