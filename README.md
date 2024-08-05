<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        function btnclick() {
            alert("button is clicked");
        }
        
        function myheading() {
            document.getElementById("heading").onmouseover = function () {
                document.getElementById("heading").style.color = "red";
            }
        }
 
        function myheading2() {
            document.getElementById("heading").onmouseout = function () {
                document.getElementById("heading").style.color = "black";
            }
        }
        
        function showDetails() {
            var name = "Pallavi Kapadnis";
            var email = "sakshikapadnis31@gmail.com";
            var phone = "1234559";
            var dob = "2000-01-01";
            
            alert("Name: " + name + "\nEmail: " + email + "\nMo.no.: " + phone + "\nDate of Birth: " + dob);
        }
    </script>
</head>
<body>
    <h1 style="width:300px;height: 100px;" id="heading" onmouseout="myheading2()" onmouseover="myheading()">this is another event</h1>
    <button id="mybtn" onclick="btnclick()">Click me</button>
    
    <h2>Register</h2>
    <form>
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" value=""><br>
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" value=""><br>
        <label for="phone">Mo.no.:</label><br>
        <input type="text" id="phone" name="phone" value=""><br>
        <label for="dob">Date of Birth:</label><br>
        <input type="date" id="dob" name="dob" value=""><br><br>
        <input type="button" value="Register" onclick="showDetails()">
    </form>
</body>
</html>
