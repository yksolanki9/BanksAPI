## About the project
* A REST service that can fetch bank details, using the data given in the API’s query parameters.
* The data available in [this](https://github.com/snarayanank2/indian_banks) repository is used as backend DB.
* The Postgres DB is hosted on [clever-cloud](clever-sloud.com)
* The Node app is hosted on heroku. You can check it [here](https://indian-bank-api.herokuapp.com)

The app has following endpoints:

1. Autocomplete API to return possible matches based on the branch name ordered by IFSC code with limit and offset.
    1. Endpoint: /api/branches/autocomplete?q=<>
    2. Example: /api/branches/autocomplete?q=RTGS&limit=3&offset=0

2. Search API to return possible matches across all columns and all rows, ordered by IFSC code with limit and offset.
    1. Endpoint: /api/branches?q=<>
    2. Example: /api/branches?q=Bangalore&limit=4&offset=0

