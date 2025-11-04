<?php
// Use correct relative path (header is in 'includes/')
include_once(__DIR__ . '/../config.php');

// Access global variables
global $nav_links, $css_version;

$current_page = basename($_SERVER['PHP_SELF']);
$page_title = isset($page_title) ? $page_title : "Andhra Angel Networks";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($page_title); ?></title>

    <link rel="stylesheet" href="css/style.css?v=<?php echo $css_version; ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>

<header class="site-header">

    <!-- Top Bar -->
    <div class="top-bar">
        <div class="container">
            <ul class="top-nav-links">
                <?php 
                foreach ($nav_links as $link) {
                    if ($link['location'] === 'community' || $link['text'] === 'Contact Us') {
                        echo '<li><a href="' . $link['href'] . '">' . htmlspecialchars($link['text']) . '</a></li>';
                    }
                }
                ?>
            </ul>
        </div>
    </div>

    <!-- Main Navigation -->
    <nav class="main-nav">
        <div class="container">
            <a href="index.php" class="logo">
                <img src="assets/Andhra angel network logos.png" alt="Andhra Angel Networks Logo">
            </a>

            <ul class="main-nav-links">
                <?php 
                foreach ($nav_links as $link) {
                    if ($link['location'] === 'primary') {
                        $link_page = basename($link['href']);
                        $active_class = ($current_page === $link_page) ? 'active' : '';
                        echo '<li><a href="' . $link['href'] . '" class="' . $active_class . '">' . htmlspecialchars($link['text']) . '</a></li>';
                    }
                }
                ?>
            </ul>

            <a href="index.php#apply-funding" class="btn btn-primary">Apply for Funding</a>

            <button class="menu-toggle" aria-label="Open navigation menu">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-nav-menu">
        <button class="menu-close" aria-label="Close navigation menu">
            <i class="fas fa-times"></i>
        </button>
        <ul>
            <li class="section-title">Primary</li>
            <?php 
            foreach ($nav_links as $link) {
                if ($link['location'] === 'primary') {
                    echo '<li><a href="' . $link['href'] . '">' . htmlspecialchars($link['text']) . '</a></li>';
                }
            }
            ?>

            <li class="section-title">Community</li>
            <?php 
            foreach ($nav_links as $link) {
                if ($link['location'] === 'community') {
                    echo '<li><a href="' . $link['href'] . '">' . htmlspecialchars($link['text']) . '</a></li>';
                }
            }
            ?>

            <li class="section-title">Get in Touch</li>
            <?php 
            foreach ($nav_links as $link) {
                if ($link['location'] === 'contact') {
                    $class = !empty($link['is_button']) ? 'btn btn-primary' : '';
                    echo '<li><a href="' . $link['href'] . '" class="' . $class . '">' . htmlspecialchars($link['text']) . '</a></li>';
                }
            }
            ?>
        </ul>
    </div>
</header>

<main>
