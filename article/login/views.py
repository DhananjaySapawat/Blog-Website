from django.shortcuts import redirect, render
from django.contrib.auth.models import User, auth
from django.contrib import messages
import re
# Create your views here.

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user =auth.authenticate(username=username,password=password)
        if user is not None:
            auth.login(request,user)
            return redirect('/')
        else:
            messages.info(request,'invalid credentials')
            return redirect("login") 
    else:        
        return render(request,'login.html')
def validname(name):
    if re.match("(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$",name):
        return True
    else:
        return False
def signup(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']
        if(User.objects.filter(username=username).exists()):
            messages.info(request,'username taken')
            return redirect('signup')
        elif(User.objects.filter(email=email).exists()):
            messages.info(request,'email taken')
            return redirect('signup')
        elif(validname(first_name) == False):
            messages.info(request,'first_name is not valid...')
            return redirect('signup')
        elif(validname(last_name) == False):
            messages.info(request,'last_name is not valid...')
            return redirect('signup')
        elif(validname(username) == False):
            messages.info(request,'username is not valid...')
            return redirect('signup')
        elif(username == "AnonymousUser"):
            messages.info(request,'cannot take AnonymousUser as username...')
            return redirect('signup')
        elif(password != confirm_password):
            messages.info(request,'password not matching... ')
            return redirect('signup')
        else:
            users = User.objects.create_user(first_name = first_name,last_name = last_name,username=username,email=email,password=password)
            users.save();
            print('user created')
        return redirect('/')

    else:
        return render(request,'signup.html')
def home(request):
    current_user = request.user
    context = {'current_user':current_user}
    return render(request,'home.html',context)
def logout(request):
    auth.logout(request)
    return redirect('/')