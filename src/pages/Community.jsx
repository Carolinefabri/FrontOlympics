import "@weavy/uikit-react/dist/css/weavy.css";
import React, { useEffect, useState } from "react";
import { WeavyClient, WeavyProvider, Chat } from "@weavy/uikit-react";

async function setupWeavy() {
  let response = await fetch(
    "https://167b892bfb0a444b94f4cdaf6b2afcab.weavy.io/api/users/demouser/tokens",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer wys_cAYcvqSvtdNwO7N25r4lRDK3pVz7hU0Y6Pip`,
      },
      body: JSON.stringify({ name: "Demo User", expires_in: 7200 }),
    }
  );

  if (response.ok) {
    let chat = await fetch(
      "https://167b892bfb0a444b94f4cdaf6b2afcab.weavy.io/api/apps/init",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer wys_cAYcvqSvtdNwO7N25r4lRDK3pVz7hU0Y6Pip`,
        },
        body: JSON.stringify({
          app: { uid: "demochat", name: "Demo chat", type: "Chat" },
          user: { uid: "demouser" },
        }),
      }
    );

    if (chat.ok) {
      let resp = await chat.json();
      let accessToken = resp.access_token;

      const weavyClient = new WeavyClient({
        url: "https://167b892bfb0a444b94f4cdaf6b2afcab.weavy.io",
        tokenFactory: async () => accessToken,
      });

      // Render your component here with the weavyClient
      return weavyClient;
    }
  }

  return null;
}

function Community() {
  const [weavyClient, setWeavyClient] = useState(null);

  useEffect(() => {
    setupWeavy().then((client) => {
      if (client) {
        setWeavyClient(client);
      }
    });
  }, []);

  if (!weavyClient) {
    // Handle loading or error state here
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <WeavyProvider client={weavyClient}>
        <Chat uid="demochat" />
      </WeavyProvider>
    </div>
  );
}

export default Community;
