# 
## How to run the code:
1. create a virtual environment named .venv by command py -3 -m venv .venv
2. start virtual environment by command source .venv/scripts/activate
3. now run following command to install django and react js
 - ./django_install.sh
 - cd article
 - cd frontend
 - npm install ( if not work use yarn add node-modules)
 - cd ..
 - python manage.py makemigrations
 - python manage.py migrate
 - python manage.py runserver
