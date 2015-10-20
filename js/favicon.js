// This file creates an easter egg in the game, wherein the favicon
// is animated when debug mode is on.
// The frame starts at 1.
var faviconFrame = 1;

function favicon() {
        // Make a new html element
        var link = document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        link.id = 'favicon';
        // If there's an old favicon, remove it
        oldLink = document.getElementById('favicon');
        if (oldLink) document.getElementsByTagName('head')[0].removeChild(oldLink);
        // Make a new favicon html link
        link.href = 'assets/favicon/pro' + faviconFrame + '.png';
        // Increment the frame (and loop)
        faviconFrame = faviconFrame % 9 + 1;
        // Add the link to the html
        document.getElementsByTagName('head')[0].appendChild(link);
};

favicon();