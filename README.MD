


## How to run the server

<b>be sure that you are in the directory of the sever</b>
> cd server

<b>Install all the dependencies by</b>
> npm install

<b>To run the server simply run the command start</b>
> npm start

In the CLI you will see
<code>Server running on port 8000</code>
The server now runs on port <b>8000</b> by default but you can change the port

You can find the <a href="https://github.com/Oaik/COVID-Tracker/edit/main/README.md#design-of-database"> Design of the database </a>

Also the <a href="https://github.com/Oaik/COVID-Tracker/edit/main/README.md#design-of-api"> API Design </a>


## Built with
<ul>
<li>
<a href="https://nodejs.org/en/">Nodejs</a>
</li>
<li>
<a href="https://expressjs.com/">Express</a>
</li>
<li>
<a href="https://www.mongodb.com/">MonogoDB</a>
</li>
</ul>


Used JWT for authentication


## other apis used

Note: I used <a href="api.geonames.org">GeoNames API</a> which is free api used to give you country info based on latitude and longitude
you will need a username to make a request.


in order to make a request go geonames api make a get request to:
http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=${username}


response request will be in form to:

<pre>
{
    "languages":"tr-TR,ku,diq,az,av",
    "distance":"0",
    "countryCode":"TR",
    "countryName":"Turkey"
}
</pre>


### design of the api

The API made in postman you can include the collection in your own postman <a href="/postman-collection/COVID-Tracker.postman_collection.json">JSON File</a>.

Read postman docmentation collection for <a href="https://documenter.getpostman.com/view/1537357/UzXNSwq1">COVID-Tracker</a>

#### registration/login:
<ul>
  <li>
    Login
    <ul>
      <li> 
        post request to: <code>localhost:3000/api/login </code>
      </li>
    </ul>
  </li>
    <li>
    Register
    <ul>
      <li> 
        post request to: <code>localhost:3000/api/register </code>
      </li>
    </ul>
  </li>
</ul>


#### Profile:
<ul>
  <li>
    Update Profile
    <ul>
      <li> 
        PUT request to: http://localhost:8000/api/profile/:id
        <code>
        "Header with AUTHORIZATION: Bearer Token"
        </code>
      </li>
    </ul>
  </li>
  
  <li>
    get current profile
    <ul>
      <li> 
        Post request to: <code>http://localhost:8000/api/profile</code>
      </li>
    </ul>
  </li>
  
  <li>
    Get user profile with id
    <ul>
      <li> 
        Get request to: <code>http://localhost:8000/api/profile/:id</code>
      </li>
    </ul>
  </li>
</ul>

#### Logs:
<ul>
  <li>
    Create log
    <ul>
      <li> 
        POST request to: http://localhost:8000/api/log
        <code>
        "Header with AUTHORIZATION: Bearer Token"
        </code>
      </li>
    </ul>
  </li>
  
  <li>
    get log
    <ul>
      <li> 
        Get request to: <code>http://localhost:8000/api/logs</code>
      </li>
    </ul>
  </li>
  
  <li>
    get log in country
    <ul>
      <li> 
        Get request to: <code>http://localhost:8000/api/logs?country=COUNTRYNAME</code>
      </li>
    </ul>
  </li>
</ul>
