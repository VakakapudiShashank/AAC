<?php
// Centralized Configuration File for Andhra Angel Networks
$css_version = '2.8';

// --- Navigation Links ---
$nav_links = [
    // Primary Links
    ['href' => 'index.php', 'text' => 'Home', 'location' => 'primary'],
    ['href' => 'about_page.php', 'text' => 'About', 'location' => 'primary'],
    ['href' => 'impact_page.php', 'text' => 'Impact', 'location' => 'primary'],
    ['href' => 'services_page.php', 'text' => 'Our Services', 'location' => 'primary'],
    ['href' => 'portfolio_page.php', 'text' => 'Our Portfolio', 'location' => 'primary'],

    // Community Links
    ['href' => 'index.php#team', 'text' => 'Our Team', 'location' => 'community'],
    ['href' => 'index.php#events', 'text' => 'Upcoming Events', 'location' => 'community'],
    ['href' => 'index.php#glimpses', 'text' => 'Glimpses of Our Journey', 'location' => 'community'],
    ['href' => 'index.php#collaborations', 'text' => 'Collaborations', 'location' => 'community'],

    // Contact Section
    ['href' => 'index.php#contact', 'text' => 'Contact Us', 'location' => 'contact'],
    ['href' => 'index.php#apply-funding', 'text' => 'Apply for Funding', 'location' => 'contact', 'is_button' => true],
];
?>