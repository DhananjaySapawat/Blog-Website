# Post Article Website 

## Getting Started

First clone the repository from Github and switch to the new directory:

    $ git clone https://github.com/DhananjaySapawat/PostArticleWeb.git
    $ cd Blog-Website
    $ cd backend
    
Activate the virtualenv for your project.

    $ python -m venv venv
    $ source venv/bin/activate
    
Install project dependencies:

    $ pip install -r requirements.txt
    
Install React Modules:

    $ cd frontend
    $ npm install ( if not work use yarn add node-modules (in window) or sudo npm install (in linux) )
 
Then simply apply the migrations:
   
    $ python manage.py migrate
    

You can now run the development server:

    $ python manage.py runserver
    
