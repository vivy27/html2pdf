# HTML to PDF using puppeteer

### Backend server
Run the below command to start a backend server providing a RESTful endpoint

> npm run start

or

> yarn start

### How to download pdf from Frontend
Add the below piece of snippet. I've used the native fetch api. You could also use axios or any http client.

```js
fetch('http://localhost:8080/api/pdf', { method: 'post', body: JSON.stringify({url:'http://www.vivianjoseph.com/resume/index.html'}), headers: {"Content-type": "application/json; charset=UTF-8"}}).then(resp => resp.arrayBuffer())
        .then(resp => {
          const file = new Blob([resp], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          const link = document.createElement("a");
          link.href = fileURL;
          link.download = "vivianresume.pdf";
          link.click();
```