<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Change DOM Element</title>
</head>
<body>
    <div id="content">Original Content</div>

    <script>
        let counter = 0;
        const messages = [
            "First Message",
            "Second Message",
            "Third Message",
            "Fourth Message"
        ];

        function changeContent() {
            const contentDiv = document.getElementById("content");
            contentDiv.textContent = messages[counter];
            counter = (counter + 1) % messages.length;
        }

        setInterval(changeContent, 2000);
    </script>
</body>
</html>
