let accessToken = "";
const clientId="0ab3ed11faaf4bafa597c162a1fb1603";
const redirectURI="http://localhost:3000/";

const Spotify = {
    getAccessToken(){
        if (accessToken) return accessToken;
        const newToken = window.location.href.match(/access_token=([^&]*)/);
        const expirationTime = window.location.href.match(/expires_in=([^&]*)/);

        if(newToken && expirationTime){
            accessToken = newToken[1];
            const expirationIn = Number(expirationTime[1]);

            window.setTimeout(()=> (accessToken = ""), expirationIn * 1000);
            window.history.pushState("Access token", null, "/");
            return accessToken;
        }
        else{
            const redirect=`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = redirect;
        }
    },
    search(term){
        const AccessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            method: 'GET',
            headers: { Authorization: `Bearer ${AccessToken}`},
        })
        .then(response=>response.json())
        .then(jsonResponse=>{
            if (!jsonResponse){
                console.log("response error");
            }            
            return jsonResponse.tracks.items.map(t=>{
                return {
                    id: t.id,
                    name: t.name,
                    artist: t.artists[0].name,
                    album: t.album.name,
                    uri: t.uri
                }
            })
        })
    },
    savePlaylist(namePlaylist, trackURIs){
        if (!namePlaylist || !trackURIs) return
        const currAccessToken = this.getAccessToken();
        const header={Authorization: `Bearer ${currAccessToken}`};
        let userId;
        return fetch(`https://api.spotify.com/v1/me`,{headers:header})
        .then(response=>{
            return response.json()
            .then(jsonResponse=>{
                console.log(jsonResponse);
                userId = jsonResponse.id;
                let playlistId;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                    headers:header,
                    method:"POST",
                    body:JSON.stringify({name: namePlaylist})
                })
                .then(response=>response.json())
                .then(jsonResponse=>{
                    playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                        headers: header,
                        method:'POST',
                        body: JSON.stringify({uris:trackURIs})
                    })
                })
            })
        })

    }
};

export {Spotify};