# 
## How to run the code:
1. create a virtual environment named .venv by command py -3 -m venv .venv
2. start virtual environment by command source .venv/scripts/activate
3. now run following command to install django and react js
 - python -m pip install django
 - pip3 install django-crispy-forms
 - pip3 install djangorestframework
 - pip3 install django-cors-headers
 - pip3 install psycopg2
 - cd article
 - cd frontend
 - npm install ( if not work use yarn add node-modules)
 - cd ..
 - python manage.py makemigrations
 - python manage.py migrate
 - python manage.py runserver
