(function() {
  // Immediately-Invoked Function Expression (IIFE) to ensure the script runs automatically

  // Listener for DOMContentLoaded to ensure the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", function() {

    // Select all anchor tags with 'data-link-type' attribute
    const links = document.querySelectorAll('a[data-link-type]');

    links.forEach(link => {
      // Default link type to 'hash' if not specified
      const linkType = link.getAttribute('data-link-type') || 'hash';

      // Attempt to find a child element specified in 'data-link-url'
      const linkUrlElement = link.getAttribute('data-link-url') ? link.querySelector(link.getAttribute('data-link-url')) : null;

      let linkText;

      if (linkUrlElement && linkUrlElement.textContent) {
        // Use text from the specified child element
        linkText = linkUrlElement.textContent;
      } else {
        // Fallback to using link's own text
        linkText = link.textContent;
      }

      // Process the text for the URL
      linkText = sanitizeLinkText(linkText);

      // Construct the URL based on the link type
      let url;
      if (linkType === 'hash') {
        url = "#" + linkText;
      } else {
        // Placeholder for future link types
        url = linkText;
      }

      // Set the href attribute of the link
      link.href = url;
    });
  });

  // Function to sanitize and format link text into a URL-friendly string
  function sanitizeLinkText(text) {
    return text.trim()
               .toLowerCase()
               .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric characters
               .replace(/\s+/g, '-');       // Replace spaces with hyphens
  }
})();
