<?php
// Fix: Use correct path for config.php since header.php is in 'includes/'
include_once(__DIR__ . '/../config.php'); 

// Access global variables
global $nav_links, $css_version;

// Page variables setup
$current_page = basename($_SERVER['PHP_SELF']);
$page_title = isset($page_title) ? $page_title : "Andhra Angel Networks"; 

// Define the required display order for top bar links
$top_bar_order = [
    'index.php#events', 
    'index.php#glimpses', 
    'index.php#collaborations', 
    'index.php#team', 
    'index.php#contact'
];

$ordered_top_links = [];

// Populate ordered links based on the defined URL order
foreach ($top_bar_order as $url) {
    foreach ($nav_links as $link) {
        if ($link['href'] === $url) {
            $ordered_top_links[] = $link;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?></title> 
    
    <link rel="stylesheet" href="css/style.css?v=<?php echo $css_version; ?>"> 
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>

    <header class="site-header">
        
        <div class="top-bar">
            <div class="container">
                <ul class="top-nav-links">
                    <?php 
                    // Use the custom ordered array for the top bar
                    foreach ($ordered_top_links as $link) {
                        echo '<li><a href="' . $link['href'] . '">' . $link['text'] . '</a></li>';
                    }
                    ?>
                </ul>
            </div>
        </div>

        <nav class="main-nav">
            <div class="container">
                <a href="index.php" class="logo">
                    <img src="assets/Andhra angel network logos.png" alt="Andhra Angel Networks Logo">
                </a>
                
                <ul class="main-nav-links">
                    <?php 
                    foreach (array_filter($nav_links, fn($link) => $link['location'] == 'primary') as $link) {
                        $link_page = basename($link['href']);
                        $active_class = ($current_page == $link_page || ($link_page == 'index.php' && $current_page == '')) ? 'active' : '';
                        echo '<li><a href="' . $link['href'] . '" class="' . $active_class . '">' . htmlspecialchars($link['text']) . '</a></li>';
                    }
                    ?>
                </ul>
                
                <button class="btn btn-primary" data-modal-toggle="fundingModal">Apply for Funding</button>
                
                <button class="menu-toggle" aria-label="Open navigation menu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </nav>

        <div class="mobile-nav-menu">
            <button class="menu-close" aria-label="Close navigation menu">
                <i class="fas fa-times"></i>
            </button>
            <ul>
                <li class="section-title">Primary</li>
                <?php 
                foreach (array_filter($nav_links, fn($link) => $link['location'] == 'primary') as $link) {
                    echo '<li><a href="' . $link['href'] . '">' . htmlspecialchars($link['text']) . '</a></li>';
                }
                ?>
                
                <li class="section-title">Community</li>
                 <?php 
                foreach (array_filter($nav_links, fn($link) => $link['location'] == 'community') as $link) {
                    echo '<li><a href="' . $link['href'] . '">' . htmlspecialchars($link['text']) . '</a></li>';
                }
                ?>
                
                <li class="section-title">Get in Touch</li>
                 <?php 
                foreach (array_filter($nav_links, fn($link) => $link['location'] == 'contact') as $link) {
                    $class = isset($link['is_button']) && $link['is_button'] ? 'btn btn-primary' : '';
                    if (isset($link['is_button'])) {
                        echo '<li><button class="' . $class . '" data-modal-toggle="fundingModal">' . htmlspecialchars($link['text']) . '</button></li>';
                    } else {
                        echo '<li><a href="' . $link['href'] . '" class="' . $class . '">' . htmlspecialchars($link['text']) . '</a></li>';
                    }
                }
                ?>
            </ul>
        </div>
    </header>
    <main>



    </main>
    
    <div id="teamModal" class="funding-modal" role="dialog" aria-modal="true" aria-labelledby="team-modal-title">
        <div class="funding-modal-content team-modal-content">
            <span class="funding-modal-close" data-modal-close>&times;</span>
            <div class="team-modal-body">
                
                <h2 id="team-modal-title" class="team-modal-heading">About</h2>
                <div id="teamModalAboutText" class="team-about-text"></div>
                
                <hr class="team-modal-separator">
                
                <div class="team-member-summary">
                    <div id="teamModalAvatar" class="team-avatar-initials SRB">SRB</div>
                    <div class="team-text-area">
                        <h3 id="teamModalName" class="team-modal-name">Member Name</h3>
                        <p id="teamModalTitle" class="team-modal-title">Member Title</p>
                    </div>
                </div>
                
                <div id="teamModalStats" class="team-stats-grid">
                    </div>
                
                <a id="teamModalContactBtn" href="#" class="btn btn-primary team-modal-contact-btn">Contact</a>
                
            </div>
        </div>
    </div>
    <div id="eventModal" class="funding-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
        <div class="funding-modal-content event-modal-content">
            <span class="funding-modal-close" data-modal-close>&times;</span>
            <div class="event-modal-body">
                <div id="eventModalImageContainer" class="event-image-container">
                    </div>
                <h2 id="event-modal-title" class="event-title-text">Event Title</h2>
                <div class="event-meta">
                    <p><i class="fas fa-calendar-alt"></i> <span id="eventModalDate">Date</span></p>
                    <p><i class="fas fa-map-marker-alt"></i> <span id="eventModalLocation">Location</span></p>
                </div>
                <p id="eventModalDescription" class="event-description-text">Description</p>
            </div>
        </div>
    </div>
    <div id="fundingModal" class="funding-modal" role="dialog" aria-modal="true" aria-labelledby="funding-modal-title">
        <div class="funding-modal-content">
            <span class="funding-modal-close" data-modal-close>&times;</span>
            <h2 id="funding-modal-title">Apply for Angel Funding 🚀</h2>
            <p style="text-align: center; color: #495057; margin-bottom: 30px;">
                Fill out the form below. We're looking for high-growth potential startups in Deeptech, Agri, EV, and Waste Management.
            </p>
            <form action="#" method="POST" class="funding-form">
                <div class="funding-form-grid">
                    
                    <div class="form-group">
                        <input type="text" name="startup_name" placeholder="Startup Name" required>
                    </div>
                    
                    <div class="form-group">
                        <input type="text" name="founder_name" placeholder="Founder Name" required> </div>
                    
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email Address" required>
                    </div>
                    
                    <div class="form-group">
                        <input type="text" name="phone" placeholder="Phone Number" required>
                    </div>

                    <div class="form-group">
                        <select name="sector" required>
                            <option value="" disabled selected>Select Sector</option>
                            <option value="deeptech">Deeptech</option>
                            <option value="agri">Agri</option>
                            <option value="ev">EV</option>
                            <option value="waste_management">Waste Management</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <input type="text" name="website" placeholder="Website/Pitch Deck Link" required>
                    </div>

                    <div class="form-group form-group-full">
                        <textarea name="summary" placeholder="Brief Summary of the Problem and Solution (Max 500 characters)" maxlength="500" required></textarea>
                    </div>

                </div>
                <button type="submit" class="btn btn-primary">Submit Application</button>
            </form>
        </div>
    </div>


    <div id="imageModal" class="modal">
        <div class="modal-content">
            <span class="close-btn" aria-label="Close Modal">&times;</span>
            <div class="modal-body-content">
                <img id="modalImage" src="" alt="Gallery Image">
                <div class="modal-text-box">
                    <p id="modalCaption" class="caption-text"></p>
                    <div id="modalDetails" class="details-list"></div>
                    <p id="modalFooter" class="footer-text"></p>
                </div>
            </div>
            
            <button class="modal-nav prev-btn" aria-label="Previous Image">&lt;</button>
            <button class="modal-nav next-btn" aria-label="Next Image">&gt;</button>
        </div>
    </div>
    
    <script src="js/script.js?v=<?php echo $css_version; ?>"></script>
</body>
</html>