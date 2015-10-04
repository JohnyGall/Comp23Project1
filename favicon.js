var faviconFrame = 1;

function favicon() {
        var link = document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        link.id = 'favicon';
        oldLink = document.getElementById('favicon');
        if (oldLink) document.getElementsByTagName('head')[0].removeChild(oldLink);
        link.href = '/assets/favicon/pro' + faviconFrame + '.png';
        faviconFrame = faviconFrame % 9 + 1;
        document.getElementsByTagName('head')[0].appendChild(link);
};

favicon();