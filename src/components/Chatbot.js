import React, { useEffect, useState } from "react";


const Chatbot = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="chatpage">
        <div class="center-div">
          {loading && <div className="loading">loading</div>} 
          <iframe
            title="Chat"
            srcdoc="<body><script src='https://cdn.botpress.cloud/webchat/v1/inject.js'></script>
            <script>
              window.botpressWebChat.init({
                  'composerPlaceholder': 'Chat with PetPals',
                  'botConversationDescription': 'PetPals your new go-to for pet care...',
                  'botName': 'PetPals',
                  'botId': 'dfb709ab-173b-4fc1-a012-17ec7d590405',
                  'hostUrl': 'https://cdn.botpress.cloud/webchat/v1',
                  'messagingUrl': 'https://messaging.botpress.cloud',
                  'clientId': 'dfb709ab-173b-4fc1-a012-17ec7d590405',
                  'enableConversationDeletion': true,
                  'showPoweredBy': true,
                  'className': 'webchatIframe',
                  'containerWidth': '100%25',
                  'layoutWidth': '100%25',
                  'hideWidget': true,
                  'showCloseButton': false,
                  'disableAnimations': true,
                  'closeOnEscape': false,
                  'showConversationsButton': false,
                  'enableTranscriptDownload': false,
                  'stylesheet':'https://webchat-styler-css.botpress.app/prod/code/a75cc7a4-8076-496e-b10f-03510ceeb5f0/v13137/style.css',
                  'themeName': 'prism',
                  'frontendVersion': 'v1',
                  'showPoweredBy': true,
                  'theme': 'prism',
                  'themeColor': '#2563eb',
                  
              });
            window.botpressWebChat.onEvent(function () { window.botpressWebChat.sendEvent({ type: 'show' }) }, ['LIFECYCLE.LOADED']);
            </script></body>"
            width="100%"
            height="100%"
            onLoad={() => setLoading(false)}
          ></iframe>
        </div>
    </div>
  );
};

export default Chatbot;
