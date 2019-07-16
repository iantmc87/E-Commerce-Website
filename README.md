# E-Commerce-Website

Ticket selling website using NodeJS, ExpressJS, MongoDB, HTML, CSS and Bootstrap

<ul><li>View tickets for sale</li>
<li>Add and remove tickets from cart</li>
<li>Increase/Decrease quantity in cart</li>
<li>Create Order</li>
<li>Sign-up/Log-in</li>
<li>Forgot password option</li>
<li>View order history</li></ul>

<hr>

<h3>Prerequisites</h3>
A linux server with the following installed:
<ul><li>Ubuntu 16.04LTS</li>
<li>NodeJS 4.2.6</li>
<li>ExpressJS 4.0.0</li>
<li>MongoDB 3.2.21</li></ul>

<hr>

<h3>How to use</h3>
<ul><li>Clone or download the repository</li>
<li>Create directory and copy files into it</li>
<li>Run npm install inside directory to install node modules</li>
<li>Run the following command to populate the database with dummy products</li></ul>

```
mongoimport -d ticketDB -c products --type csv --file testUpload.csv --headerline
```

<ul><li>Run nodemon app.js</li>
<li>Open an internet browser and view website at {IP ADDRESS}:5000</li></ul>
