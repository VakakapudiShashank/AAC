    </main>

    <!-- Gallery Modal -->
    <div id="imageModal" class="modal" aria-hidden="true">
        <div class="modal-content">
            <span class="close-btn" aria-label="Close modal">&times;</span>
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

    <footer class="detailed-footer">
        <div class="container">
            <div class="footer-content-grid">

                <div class="footer-col footer-branding">
                    <p class="footer-logo-text">Andhra Angel Networks</p>
                    <p class="footer-tagline">Empowering Startups • Connecting Capital</p>
                </div>

                <div class="footer-col footer-links">
                    <a href="about_page.php">About</a>
                    <a href="services_page.php">Services</a>
                    <a href="index.php#apply-funding">Funding</a>
                    <a href="index.php#team">Team</a>
                </div>

                <div class="footer-col footer-social">
                    <a href="https://linkedin.com/company/andhraangels" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://twitter.com/andhraangels" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="https://facebook.com/andhraangels" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                </div>

            </div>

            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> Andhra Angel Networks. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="js/script.js?v=<?php echo $css_version; ?>"></script>
</body>
</html>
