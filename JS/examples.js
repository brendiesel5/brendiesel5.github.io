// const clientid = "73ccd9de1d52440b98d8e6309328de41";
// const clientsecret = "dc39df92f2154453b4f381fc6f8592b9";
// const client = clientid + ':' + clientsecret;

// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + btoa(client)
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     var token = body.access_token;
//     console.log(token);
//   }
// });

// $.ajax(
//   {
//     method: "POST",
//     url: "https://accounts.spotify.com/api/token",
//     headers: {
//       'Authorization': 'Basic ' + btoa(client),
//       'Content-type': 'application/x-www-form-urlencoded'
//     },
//     data: {
//       form: {
//         grant_type: 'client_credentials'
//       },
//     },
//     datatype: 'json',
//     success: function(result) {
//       console.log(result);
//     },
//     error: function(error)
//     {
//         console.log("we got an error" + error);
//     }
//   }
// );

// const data = {grant_type: 'client_credentials'}

// fetch("https://accounts.spotify.com/api/token?grant_type=client_credentials", {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Authorization': 'Basic ' + btoa(client),
//       'Content-type': 'application/x-www-form-urlencoded'
//   },
// })
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });

// fetch("https://musicbrainz.org/ws/2/artist/?query=Kanye&fmt=json&limit=1")